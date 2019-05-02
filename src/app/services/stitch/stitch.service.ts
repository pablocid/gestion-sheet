import { Injectable } from '@angular/core';
import { MongoDBStitchService } from '../mongodb-stitch/mongodb-stitch.service';
import { UploadFnName, AnaPhotoDeleteFnName } from 'src/app/values/config';
import { Router } from '@angular/router';
import { S3BucketName, AWSS3BaseURL } from '../../values/config';

@Injectable({
    providedIn: 'root'
})
export class StitchService extends MongoDBStitchService {

    constructor(
        private router: Router
    ) {
        super();
    }

    public async handleFileUpload(file: File, options?: { fileName?: string, resizeDataUrl?: string }) {
        // name of the file with extension
        let key = file.name;
        if (!file) { return; }

        // if resize
        const rs64 = options ? options.resizeDataUrl : undefined;

        // custome name without extension
        if (options && options.fileName) {
            const pattern = /\.([0-9a-z]+)(?:[\?#]|$)/i;
            const match = (file.name).match(pattern);
            key = options.fileName + match[0].toLowerCase();
        }
        // convert to extended json
        const result = await this.convertImageToBSONBinaryObject(file, rs64);

        // uploading the image
        const response = await this.client.callFunction(UploadFnName, [key, file.type, result]);
        return response;
    }

    public async deleteFile(key: string) {
        const response = await this.client.callFunction(AnaPhotoDeleteFnName, [key]);
        return response;
    }

    private convertImageToBSONBinaryObject(file: File, dataUrl?: string): Promise<{ $binary: { base64: string, subType: string } }> {
        return new Promise(resolve => {

            if (dataUrl) {
                const result = {
                    $binary: {
                        base64: dataUrl.split(',')[1],
                        subType: '00'
                    }
                };
                resolve(result);
                return;
            }

            const fileReader = new FileReader();
            fileReader.onload = (event: any) => {
                resolve({
                    $binary: {
                        base64: event.target.result.split(',')[1],
                        subType: '00'
                    }
                });
            };
            fileReader.readAsDataURL(file);
        });
    }

    public goTo() {
        // this.router.navigate(['login']);
    }

    public records() {
        return this.database.collection('records');
    }

    public uploadImage(imageName: string, dataURL: string, imageReNameWithoutExtension?: string) {
        let key = imageName;
        if (imageReNameWithoutExtension) {
            const pattern = /\.([0-9a-z]+)(?:[\?#]|$)/i;
            const match = (imageName).match(pattern);
            key = imageReNameWithoutExtension + match[0].toLowerCase();
        }
        // return this.s3PutObject(dataURL, key, S3BucketName);
        return this.s3PutObject(dataURL, key, S3BucketName).then(response => {
            return {
                key,
                url: AWSS3BaseURL + S3BucketName + '/' + key,
                thumbnail: AWSS3BaseURL + S3BucketName + '/thumbnails/' + key,
            };
        });
    }

    public imageList(opt?: { maxElement?: number }) {
        return this.s3ListObjects({ Bucket: S3BucketName, Prefix: 'thumbnails/', Delimiter: '/' })
            .then((res: any) => {
                if (!res.Contents || !res.Contents.length) { return []; }
                return res.Contents.map(content => {
                    const thumbnail = AWSS3BaseURL + S3BucketName + '/' + content.Key;
                    return {
                        url: thumbnail.replace('thumbnails/', ''),
                        thumbnail
                    };
                });
            });
    }

}
