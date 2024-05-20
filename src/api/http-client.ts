/* eslint-disable prettier/prettier */
import jwt from 'jwt-decode';
import { Platform } from 'react-native';
import { defer, switchMap, throwError } from 'rxjs';
import { AjaxError, AjaxResponse, ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, retry } from 'rxjs/operators';
import Utils from '../common/Utils';
import { resetPersitValue } from '../store/epics/PersistToSave';
import { store } from '../store/store';
/** types */
interface ParamRequest {
  method?: string;
  async?: boolean;
  headers?: Readonly<Record<string, any>>;
  timeout?: number;
  crossDomain?: boolean;
  withCredentials?: boolean;
  responseType?: XMLHttpRequestResponseType;
}
type PartAjaxRequest = Omit<ParamRequest, 'url' | 'method' | 'body'>;
type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';
interface Param {
  url: string;
  data?: unknown;
  headers?: PartAjaxRequest;
}

function mapResponse(res: AjaxResponse<any>) {
  console.log(JSON.stringify(res.response));
  if (res.response) {
    return res.response;
  }
}
function mapResponseHeader(res: AjaxResponse<any>) {
  // const res2 = {...res};
  const fieldText = res.responseHeaders['set-cookie'];
  const refreshToken = fieldText.split('=')[1].split(';')[0];
  const res2 = {...res};
  res2.response.refreshToken = refreshToken;
  if (res.response) {
    return res2.response;
  }
}

function mapAjaxRequest(request?: PartAjaxRequest) {
  const mapHeaders = request?.headers
    ? ({...request.headers} as PartAjaxRequest)
    : undefined;
  const token = store.getState().persist.token;
  const newHeaders = {
    // Authorization: Utils.token ? `Bearer ${Utils.token}` : '',
    Authorization: token ? `Bearer ${token}` : '',
    Accept: '*/*',
    'Content-Type': 'application/json',
    'X-Timezone-Offset': new Date().getTimezoneOffset(),
    ...mapHeaders,
  };
  console.log(token);
  return {...request, headers: {...newHeaders}};
}

let navigation: any; // undefined
export const injectNavigation = (nav: any) => {
  navigation = nav;
};

const navigationLogin = () => {
  Utils.clear();
  store.dispatch(resetPersitValue());
  navigation.replace('Auth');
};

export function isTokenValid(token: string) {
  if (!token || typeof token !== 'string') {
    return false;
  }
  const decoded = jwt(token) as any;

  const tokenExp = Utils.convertExpToDate(decoded.exp);
  console.log(new Date(tokenExp), 'tokenExppp');

  const now = new Date().getTime();
  console.log(new Date(now), 'nowwww');

  return tokenExp > now;
}


function handleError$(err: AjaxError): Observable<unknown> {
  console.error(err);
  if (err) {
    const token = store.getState().persist.token;
    if (isTokenValid(token)) {
      // todo : relogin if remember
      return throwError(() => err);
    } else {
      navigationLogin();
    }
  }
  return throwError(() => err);
}

function commonApiCall(
  method: HttpMethod,
  param: Param,
  isGetHeader = false,
): Observable<unknown> {
  const {url, data, headers} = param;
  const body = data;
  return defer(() => {
    const newHeaders = mapAjaxRequest(headers);
    return ajax({url, method, body, ...newHeaders});
  }).pipe(
    map(res => (!isGetHeader ? mapResponse(res) : mapResponseHeader(res))),
    catchError((err, source) =>
      handleError$(err).pipe(switchMap(() => source)),
    ),
  );
}

/** base class */
export default class HttpClient {
  static get(url: string, headers?: PartAjaxRequest): Observable<unknown> {
    return commonApiCall('GET', {url, headers});
  }

  static post(
    url: string,
    data: unknown,
    headers?: PartAjaxRequest,
    isGetHeader?: boolean,
  ): Observable<unknown> {
    return commonApiCall('POST', {url, data, headers}, isGetHeader);
  }

  static delete(
    url: string,
    data?: unknown,
    headers?: PartAjaxRequest,
  ): Observable<unknown> {
    return commonApiCall('DELETE', {url, data, headers});
  }

  static put(
    url: string,
    data: unknown,
    headers?: PartAjaxRequest,
  ): Observable<unknown> {
    return commonApiCall('PUT', {url, data, headers});
  }
  static upload(
    url: string,
    data: unknown,
    _headers?: PartAjaxRequest,
  ): Observable<unknown> {
    console.log('------------------');
    console.log(url);
    data && console.log(JSON.stringify(data));
    console.log('------------------');
    const token = store.getState().persist.token;
    return ajax({
      url,
      method: 'POST',
      body: data,
      headers: {
        // Authorization: Utils.token ? `Bearer ${Utils.token}` : '',
        Authorization: token ? `Bearer ${token}` : '',
      },
    }).pipe(
      map((response: AjaxResponse<any>) => mapResponse(response)),
      retry(2),
      catchError(err => handleError$(err)),
    );
  }
  static uploadImages = (url: string, files: any[]) => {
    var data = files.filter(file => {
      if (!file) {
        return false;
      }
      var nameFile = file.fileName ?? file.name;
      if (
        !['.jpeg', '.jpg', '.png', '.heif', '.heic'].includes(
          nameFile?.substring(nameFile.lastIndexOf('.')).toLocaleLowerCase() ??
            '',
        )
      ) {
        return false;
      }
      if (!file.uri) {
        return false;
      }
      return true;
    });
    console.log('------------------');
    console.log(data);
    const formData = new FormData();
    for (let file of data) {
      var nameFile = file.fileName ?? file.name;
      var type =
        nameFile?.substring(nameFile.lastIndexOf('.')).toLocaleLowerCase() ??
        '';
      formData.append('ListFiles', {
        name: nameFile,
        type: 'image/' + type.replace('.', ''),
        uri:
          Platform.OS === 'ios' ? file.uri?.replace('file://', '') : file.uri,
      });
    }
    return HttpClient.upload(url, formData);
  };
  static uploadImage = (url: string, file: any) => {
    if (!file) {
      return throwError(() => 'file is not null');
    }
    var nameFile = file.fileName ?? file.name;
    if (
      !['.jpeg', '.jpg', '.png', '.heif', '.heic'].includes(
        nameFile?.substring(nameFile.lastIndexOf('.')).toLocaleLowerCase() ??
          '',
      )
    ) {
      return throwError(() => 'format is not supported');
    }
    if (!file.uri) {
      return throwError(() => 'file is not found');
    }
    var nameFile = file.fileName ?? file.name;
    var type =
      nameFile?.substring(nameFile.lastIndexOf('.')).toLocaleLowerCase() ?? '';
    const formData = new FormData();
    formData.append('File', {
      name: nameFile,
      type: file.type ? file.type : 'image/' + type.replace('.', ''),
      uri: Platform.OS === 'ios' ? file.uri?.replace('file://', '') : file.uri,
    });
    return HttpClient.upload(url, formData);
  };
}

export const ajaxErrorFlashMessage = (error: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const message =
    typeof error === 'string'
      ? error
      : (error.response &&
          error.response.error &&
          error.response.error.message) ||
        error.message;
  // showMessage({
  //     message: 'Oops!',
  //     description: message,
  //     type: 'danger',
  // });
};
