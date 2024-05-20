import { catchError, map, Observable, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import HttpClient from './http-client';

export default class heritagesApi {
  static getAllHeritages(): Observable<any> {
    const api = 'http://192.168.1.4:8000/v1/heritage';
    return HttpClient.get(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map((res: any) => {
        console.log('res::::', res);
        // Lọc các dữ liệu có thuộc tính status là 'approved'
        // const approvedSites = res.filter(
        //   (site: any) => site.status === 'approved',
        // );
        // return approvedSites;
        return res;
      }),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
  static getHeritagesbyID(id: string): Observable<any> {
    const api = `http://192.168.1.4:8000/v1/heritage/${id}`;
    return HttpClient.get(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map(res => (res as any) || null),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
  static addHeritagesToFavByID(id: string): Observable<any> {
    const api = `http://192.168.1.4:8000/v1/heritage/addToInterest/${id}`;
    return HttpClient.post(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map(res => (res as any) || null),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
  static removeHeritagesToFavByID(id: string): Observable<any> {
    const api = `http://192.168.1.4:8000/v1/heritage/removeFromInterest/${id}`;
    return HttpClient.post(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map(res => (res as any) || null),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
}
