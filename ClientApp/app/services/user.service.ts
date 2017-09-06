import { Injectable, Injector, Inject, ValueProvider } from '@angular/core';
import {Headers,  RequestOptions,  Http,  Response,  Request} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    private readonly url: string;// = "/api/users";
    constructor(protected http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl + 'api/user';
    }

    getSingle(userId?: string) {
        let endpointUrl = userId ? `${this.url}/${userId}` : this.url;

        return this.http.get(endpointUrl)
            .map((response: Response) => <User>response.json());
    }

    getAll() {
        let endpointUrl = this.url;

        return this.http.get(endpointUrl)
            .map((response: Response) => <User[]>response.json());
        // let datas:User[]=[];
        // this.http.get(endpointUrl)
        //     .map(res=> <User[]>res.json())
        //     .subscribe(res => datas = res);

        //     return datas;
    }

    put(userId?: string, model?: User) {
        let endpointUrl = userId ? `${this.url}/${userId}` : this.url;
        // 
        // for ( var key in Object.getOwnPropertyNames(model) ) {
        //     formData.append(key, model[key]);
        // }
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(
            endpointUrl,
            model,//JSON.stringify(model),
            new RequestOptions({ headers: _headers })
        );
        //.subscribe((response) => { });
    }

    postFile(file1?:File) {
            var fData = new FormData();
            if(file1 !=null){
                fData.append("file", file1);
            }
            let _headers = new Headers({ 'Accept': 'application/json' });
            
            return this.http.post(
                `${this.url}/ufile`,
                fData,
                new RequestOptions({ headers: _headers })
            ).map((response: Response) => <string>response.json());;
    }

    post(model: User) {
        let endpointUrl = this.url;

        let _headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(endpointUrl, JSON.stringify(model), new RequestOptions({ headers: _headers }))
            .map((response: Response) => {
                return response;
            });
    }

    delete(userId?: string) {
        let endpointUrl = userId ? `${this.url}/${userId}` : this.url;

        return this.http.delete(endpointUrl);
        //.map((response: Response) => <User>response.json());
    }
}
