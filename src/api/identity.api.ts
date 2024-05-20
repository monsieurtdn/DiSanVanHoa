/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { Observable, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import Utils, { ResponseToken } from '../common/Utils';
import HttpClient from './http-client';
export default class IdentityApi {
  static login(body: {
    identifier: string;
    password: string;
  }): Observable<ResponseToken | null> {
    const api = 'http://192.168.1.4:8000/v1/auth/login';
    const reqBody = {
      username: body.identifier,
      password: body.password,
    };
    console.log(reqBody, 'reqBody');
    return HttpClient.post(api, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    },true).pipe(
      map(
        (res) =>  (res as ResponseToken) || null,
        catchError((e: AjaxError) => {
          console.log(e);
          return throwError(e);
        }),
      ),
    );
  }

  static refresh(): Observable<ResponseToken | null> {
    const api = 'http://192.168.1.4:8000/v1/auth/refresh';
    var request = new URLSearchParams();
    request.append('client_id', 'Admin');
    request.append('grant_type', 'refresh_token');
    request.append('refresh_token', Utils.refresh);
    console.log('token',Utils.token);
    return HttpClient.post(api, request.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).pipe(
      map(
        res => (res as ResponseToken) || null,
        catchError((e: AjaxError) => {
          console.log(e);
          return throwError(e);
        }),
      ),
    );
  }

  static logout(token: string): Observable<ResponseToken | null> {
    const api = 'http://192.168.1.4:8000/v1/auth/logout';
    return HttpClient.post(api, token, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map(
        res => (res as ResponseToken) || null,
        catchError((e: AjaxError) => {
          console.log(e);
          return throwError(e);
        }),
      ),
    );
  }
}
