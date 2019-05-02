import { Injectable } from '@angular/core';
import {
    Stitch,
    RemoteMongoClient,
    StitchAppClient,
    RemoteMongoDatabase,
    StitchUser,
    StitchAuthListener,
    UserPasswordCredential,
    StitchServiceError,
} from 'mongodb-stitch-browser-sdk';
import { BehaviorSubject } from 'rxjs';
import { AppNameStitch, DbNameStitch } from 'src/app/values/config';
import { AwsServiceClient } from 'mongodb-stitch-browser-services-aws';
import { AwsRequest } from 'mongodb-stitch-core-services-aws';

export class MongoDBStitchService {
    private static appName = AppNameStitch;
    private static dbName = DbNameStitch;
    public client: StitchAppClient;
    public database: RemoteMongoDatabase;
    public credential: UserPasswordCredential;
    private listener: StitchAuthListener;
    public user$: BehaviorSubject<StitchUser>;
    public isLoggedIn$: BehaviorSubject<boolean>;

    constructor() {
        this.client = Stitch.initializeDefaultAppClient(MongoDBStitchService.appName);
        this.database = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(MongoDBStitchService.dbName);
        this.credential = new UserPasswordCredential('', '');
        this.user$ = new BehaviorSubject(this.client.auth.user);
        this.isLoggedIn$ = new BehaviorSubject(this.client.auth.isLoggedIn);
        this.setListener();
    }

    public get hastRedirect(): boolean {
        return this.client.auth.hasRedirectResult();
    }

    public get isLoggedIn(): boolean {
        return this.client.auth.isLoggedIn;
    }

    public infoUser(): Promise<{ id: string, role: string, email: string, pic: string }> {
        return this.client.callFunction('infoUser', []);
    }

    public goTo() { }

    private async setListener() {
        console.log('setting listener');
        this.listener = {
            onAuthEvent: (event) => {
                if (!event.isLoggedIn) {
                    console.log('Event logout');
                    this.goTo();
                }
                if (event.isLoggedIn) { console.log('Event login'); }
                this.isLoggedIn$.next(event.isLoggedIn);
            }
        };

        if (this.client.auth.hasRedirectResult()) {
            await this.handleRedirect();
            this.client.auth.addAuthListener(this.listener);
        } else {
            this.client.auth.addAuthListener(this.listener);
        }

    }

    public async auth(creds: { email: string, password: string }): Promise<StitchUser> {
        if (!creds) { return; }
        this.credential = new UserPasswordCredential(creds.email, creds.password);
        return await this.client.auth.loginWithCredential(this.credential);

    }

    public async handleRedirect() {
        if (!this.client.auth.hasRedirectResult()) { return; }
        const user = await this.client.auth.handleRedirectResult();
        this.user$.next(user);
        this.setListener();
    }

    public async logout() {
        await this.client.auth.logout();
        localStorage.clear();
    }

    public lambda(FunctionName: string, Payload: Object) {
        const aws = this.client.getServiceClient(AwsServiceClient.factory, 'AWSAccess');
        const request = new AwsRequest.Builder()
            .withService('lambda')
            .withAction('Invoke')
            .withArgs({
                FunctionName,
                Payload: JSON.stringify(Payload)
            });
        return aws.execute(request.build());
    }

    protected s3PutObject(dataURL: string, Key: string, Bucket: string) {
        const ContentType = this.base64MimeType(dataURL);
        const Body = {
            $binary: {
                base64: dataURL.split(',')[1],
                subType: '00'
            }
        };

        const aws = this.client.getServiceClient(AwsServiceClient.factory, 'AWSAccess');
        const args = { ACL: 'public-read', Bucket, ContentType, Key, Body };

        const request = new AwsRequest.Builder()
            .withService('s3')
            .withAction('PutObject')
            .withRegion('us-east-1')
            .withArgs(args)
            .build();

        return aws.execute(request);
    }

    private base64MimeType(encoded) {
        let result = null;

        if (typeof encoded !== 'string') {
            return result;
        }

        const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

        if (mime && mime.length) {
            result = mime[1];
        }

        return result;
    }

    protected s3ListObjects(args: { Bucket: string, MaxKeys?: number, Delimiter?: string, Prefix?: string }) {

        const aws = this.client.getServiceClient(AwsServiceClient.factory, 'AWSAccess');

        const request = new AwsRequest.Builder()
            .withService('s3')
            .withAction('ListObjectsV2')
            .withRegion('us-east-1')
            .withArgs(args)
            .build();

        return aws.execute(request);
    }

}
