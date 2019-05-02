import { Component, OnInit } from '@angular/core';
import { ImageResult } from 'ngx-image2dataurl';
import * as UUID from 'uuid';
import { StitchService } from 'src/app/services/stitch/stitch.service';
import { ImageDialogComponent } from 'src/app/components/image-dialog/image-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  public response;
  public loading: boolean;

  constructor(
    private stitch: StitchService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  public async selected(img: ImageResult) {
    this.response = undefined;
    this.loading = true;

    console.log('img', img);

    const name = UUID();
    // const res = await this.stitch.handleFileUpload(img.file, {
    //   resizeDataUrl: img.resized.dataURL,
    //   fileName: name
    // });

    const res = await this.stitch.uploadImage(img.file.name, img.resized.dataURL, name);

    console.log('res', res, name);
    setTimeout(() => {
      this.response = res;
      this.loading = false;
    }, 2000);
  }
  goBack() {
    this.router.navigate(['/nectarines']);
  }
  showImg(data) {
    this.dialog.open(ImageDialogComponent, { data });
  }

  copy() {
    /* Get the text field */
    const copyText = document.createElement('textarea');
    document.body.appendChild(copyText);

    copyText.value = this.response.key;

    /* Select the text field */
    // copyText.focus();
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand('copy');
    document.body.removeChild(copyText);

    this.openSnackBar('¡copiado en portapapeles!');

    /* Alert the copied text */
    // alert('Copied the text: ' + copyText.value);
  }

}
