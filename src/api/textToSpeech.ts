import {catchError, map, Observable, throwError} from 'rxjs';
import {AjaxError} from 'rxjs/ajax';
import HttpClient from './http-client';

export default class textToSpeechApi {
  static getSpeechFromText(data: string): Observable<any> {
    const api = 'https://api.fpt.ai/hmi/tts/v5';
    return HttpClient.post(api, data, {
      headers: {
        'api-key': 'nGwtsHiURSQjxIVX7Fre7VY3KcnL7APQ',
        speed: '',
        voice: 'banmai',
      },
    }).pipe(
      map(res => (res as any) || null),
      catchError((e: AjaxError) => throwError(e)),
    );
  }
}
