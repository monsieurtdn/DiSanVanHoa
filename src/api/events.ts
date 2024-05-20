import { catchError, map, Observable, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import HttpClient from './http-client';

export default class eventsApi {
  static getAllEvents(): Observable<any> {
    const api = 'http://192.168.1.4:8000/v1/event';
    return HttpClient.get(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map((res: any) => {
        console.log('res::::', res);
        // Lọc các dữ liệu có thuộc tính status là 'approved'
        // const approvedEvents = res.filter(
        //   (event: any) => event.status === 'approved',
        // );
        // return approvedEvents;
        return res;
      }),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
  static getEventbyID(id: string): Observable<any> {
    const api = `http://192.168.1.4:8000/v1/event/${id}`;
    return HttpClient.get(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map(res => (res as any) || null),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
  static addEventToFavByID(id: string): Observable<any> {
    const api = `http://192.168.1.4:8000/v1/event/addToInterest/${id}`;
    return HttpClient.get(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map(res => {
        console.log(res);
        return (res as any) || null;
      }),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
  static removeEventToFavByID(id: string): Observable<any> {
    const api = `http://192.168.1.4:8000/v1/event/removeFromInterest/${id}`;
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
