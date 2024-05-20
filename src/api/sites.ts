import { catchError, map, Observable, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import HttpClient from './http-client';

export default class sitesApi {
  static getAllSites(): Observable<any> {
    const api = 'http://192.168.1.4:8000/v1/site';
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
  static getSitebyID(id: string): Observable<any> {
    const api = `http://192.168.1.4:8000/v1/site/${id}`;
    return HttpClient.get(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map(res => (res as any) || null),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
  static addSiteToFavByID(id: string): Observable<any> {
    const api = `http://192.168.1.4:8000/v1/site/addToInterest/${id}`;
    return HttpClient.get(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map(res => (res as any) || null),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
}
