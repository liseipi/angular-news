import {Injectable} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {TokenModel} from "../store/token/token.model";
import {tokenSelect} from "../store/token/token.selector";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token$: string | null = null;

  constructor(
    private tokenStore: Store<TokenModel>,
  ) {
    this.tokenStore.pipe(select(tokenSelect)).subscribe(token => {
      this.token$ = String(token);
    });
  }

  haveToken(): boolean {
    return !!this.token$
  }
}
