import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, lastValueFrom, map, Observable, tap} from "rxjs";
import {ResponseModel} from "../model/http.response.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly headers: HttpHeaders;

  constructor(
    public http: HttpClient,
  ) {
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
  }

  async toGet(url: string, params?: any): Promise<ResponseModel> {
    try {
      const result$ = this.http.get(url, {
        headers: this.headers,
        params
      }).pipe(
        tap((resp: object | []) => {
          return resp;
        })
      );
      return await lastValueFrom(result$) as ResponseModel;

    } catch (err) {
      return Promise.reject(err);
    }
  }
  async toPost(url: string, body?: any, params?: any): Promise<ResponseModel> {
    try {
      const result$ = this.http.post(url, body, {
        headers: this.headers,
        params
      }).pipe(
        tap((resp: object | []) => {
          return resp;
        })
      );
      return await lastValueFrom(result$) as ResponseModel;

    } catch (err) {
      return Promise.reject(err);
    }
  }

  async toPostTest(url: string, body?: any, params?: any): Promise<void> {
    const response = this.http.post(url, body, {headers: this.headers, params});
    await firstValueFrom(response);
  }

}
