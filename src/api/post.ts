import { catchError, map, Observable, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import HttpClient from './http-client';

export default class postsApi {
  static getAllPosts(): Observable<any> {
    const api = 'http://192.168.1.4:8000/v1/post';
    return HttpClient.get(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map((res: any) => {
        console.log('res::::', res);
        // Lọc các dữ liệu có thuộc tính status là 'approved'
        // const approvedPosts = res.filter(
        //   (post: any) => post.status === 'approved',
        // );
        // return approvedPosts;
        return res;
      }),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
  static getPostbyID(id: string): Observable<any> {
    const api = `http://192.168.1.4:8000/v1/post/${id}`;
    return HttpClient.get(api, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map(res => (res as any) || null),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
  static addPostToFavByID(id: string): Observable<any> {
    const api = `http://192.168.1.4:8000/v1/post/addToInterest/${id}`;
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
