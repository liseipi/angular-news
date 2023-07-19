import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {LayoutModule} from "./layout/layout.module";
import {HttpAuthInterceptor} from "./shared/http-auth.interceptor";
import {ActionReducer, MetaReducer, StoreModule} from "@ngrx/store";
import {AppState} from "./store/app.state";
import {localStorageSync} from "ngrx-store-localstorage";
import {InfiniteScrollModule} from "ngx-infinite-scroll";


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['access_token', 'access_info'],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    LayoutModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    StoreModule.forRoot(AppState, {
      metaReducers
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
