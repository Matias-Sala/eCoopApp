import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './models/user';
import { baseUrl, handleError, httpOptions } from '../service.config';



@Injectable()
export class LoginService {

    private loginUrl = baseUrl + '/account/signIn';

    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http.post(this.loginUrl, { email , password }, {...httpOptions, responseType: 'text'});
    }

    logout() {
    }
}
