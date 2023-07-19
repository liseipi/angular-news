import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {TokenModel} from "../store/token/token.model";
import {ProfileModel} from "../store/access/access.model";
import {setToken} from "../store/token/token.action";
import {setProfile} from "../store/access/access.action";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private tokenStore: Store<TokenModel>,
    private accessStore: Store<ProfileModel>
  ) {
  }

  logout(): void {
    this.tokenStore.dispatch(setToken({token: ''}));
    this.accessStore.dispatch(setProfile({}));
    window.location.reload();
  }
}
