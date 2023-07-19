import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {createFeatureSelector, select, Store} from "@ngrx/store";
import {TokenModel} from "../store/token/token.model";
import {tokenSelect} from "../store/token/token.selector";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  token$: Observable<any>;

  constructor(
    private tokenStore: Store<TokenModel>,
  ) {
    this.token$ = this.tokenStore.pipe(select(tokenSelect));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = ''
    this.token$.subscribe(item => token = item);

    let header = new HttpHeaders();
    if (token) {
      header = header.append('Authorization', `Bearer ${token}`)
    }

    const req = request.clone({
      headers: header
    });
    return next.handle(req)
      .pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // 处理 response
          // console.log(event);
          // event = event.clone({body: event.body});
        }
        return event;
      }));
  }

}
