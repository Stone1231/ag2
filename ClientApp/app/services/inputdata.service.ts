import { Injectable, Injector, Inject, ValueProvider } from '@angular/core';
import { Headers, RequestOptions, Http, Response, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user.model';

@Injectable()
export class InputdataService {
    private readonly url: string;// = "/api/users";
    constructor(protected http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl + 'api/inputdata';
    }
}