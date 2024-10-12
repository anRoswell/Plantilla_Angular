import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  apiUrlNodeJs = environment.API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  private apiRest(rutaApi: string, opcion: any) {
    const api = environment.API_URL;
    const apiRest = `${api}${rutaApi}`;
    return apiRest;
  }

  public PostImg(body: FormData, rutaApi: string = '', opcion: string = 'node'): Observable<any> {
    const APIREST = this.apiRest(rutaApi, opcion);
    return this.http.post<any>(`${APIREST}`, body).pipe(tap((resp) => of(resp)));
  }

  public getMethod<T>(endpoint: string, params?: HttpParams):Observable<T> {
    return this.http.get<T>(`${this.apiUrlNodeJs}${endpoint}`, { params, headers: this.httpOptions.headers });
  }

  public postMethod<T>(endpoint: string, body: object, opcion: string = 'node'): Observable<T> {
    return this.http.post<T>(`${this.apiUrlNodeJs}${endpoint}`, JSON.stringify(body), this.httpOptions);
  }

  public putMethod(endpoint: string, body: object, params?: HttpParams) {
    return this.http.put(`${this.apiUrlNodeJs}${endpoint}`, JSON.stringify(body), { params, headers: this.httpOptions.headers });
  }

  public patchMethod(endpoint: string, body: object, params?: HttpParams) {
    return this.http.patch(`${this.apiUrlNodeJs}${endpoint}`, JSON.stringify(body), { params, headers: this.httpOptions.headers });
  }

  public deleteMethod(endpoint: string, params?: HttpParams) {
    return this.http.delete(`${this.apiUrlNodeJs}${endpoint}`, { params, headers: this.httpOptions.headers });
  }
}
