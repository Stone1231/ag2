import { Injectable, Injector, Inject, ValueProvider } from '@angular/core';
import { Headers, RequestOptions, Http, Response, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user.model';

@Injectable()
export class FileService {
    private readonly url: string;// = "/api/users";
    constructor(protected http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl + 'api/file';
    }

    postFile(file1?: File) {
        var fData = new FormData();
        if (file1 != null) {
            fData.append("file", file1);
        }
        let _headers = new Headers({ 'Accept': 'application/json' });

        return this.http.post(
            `${this.url}/ufile`,
            fData,
            new RequestOptions({ headers: _headers })
        ).map((response: Response) => <string>response.json());;
    }

    postFiles(files?: File[]) {

        var fData = new FormData();
        if (files != null) {

            for (var i in files) {
                if (i != null) {
                    fData.append("files", files[i]);
                }
            }

            // files.forEach(f => {

            // })
        }
        let _headers = new Headers({ 'Accept': 'application/json' });

        return this.http.post(
            `${this.url}/ufiles`,
            fData,
            new RequestOptions({ headers: _headers })
        ).map((response: Response) => <string[]>response.json());;
    }

    postFile2(file1?: File, file2?: File) {
        var fData = new FormData();
        if (file1 != null) {
            fData.append("file1", file1);
        }
        if (file2 != null) {
            fData.append("file2", file2);
        }
        let _headers = new Headers({ 'Accept': 'application/json' });

        return this.http.post(
            `${this.url}/ufile2`,
            fData,
            new RequestOptions({ headers: _headers })
        ).map((response: Response) => <string[]>response.json());;
    }
}