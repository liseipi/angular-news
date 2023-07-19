import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Toast, Input, Ripple, initTE} from "tw-elements";
import {LoginService} from "./login.service";
import {Store} from "@ngrx/store";
import {setToken} from "../../../store/token/token.action";
import {TokenModel} from "../../../store/token/token.model";
import {ProfileModel} from "../../../store/access/access.model";
import {setProfile} from "../../../store/access/access.action";
import {ToastComponent} from "../../../components/toast/toast.component";
import {Router, RouterLink} from "@angular/router";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage, RouterLink],
  providers: [LoginService]
})
export class LoginComponent {
  infoTitleTxt: string;
  infoContentTxt: string;

  @ViewChild('container', {read: ViewContainerRef})
  container!: ViewContainerRef;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private tokenStore: Store<TokenModel>,
    private accessStore: Store<ProfileModel>
  ) {
    this.infoTitleTxt = this.loginService.infoTitleTxt;
    this.infoContentTxt = this.loginService.infoContentTxt;
  }

  formData = {
    email: '',
    password: ''
  }

  arrayFrom(obj: any) {
    return Object.keys(obj).length > 0 ? Object.keys(obj).slice(0, 1) : [];
  }

  ngOnInit() {
    initTE({Input, Ripple, Toast});
  }

  async HandleLogin() {
    // console.log(this.formData);
    try {
      const result = await this.loginService.doLogin(this.formData);
      // console.log(result);

      if (result?.error === 0 && result.data?.token) {
        const token = result.data.token;
        this.tokenStore.dispatch(setToken({token: String(token)}));

        const profile = await this.loginService.doProfile();
        // console.log(profile)
        if (profile?.error === 0 && profile.data!) {
          // console.log(profile.data)
          await this.accessStore.dispatch(setProfile(profile.data!));
          // await this.createToastComponent('success', '登录成功', '欢迎回来');
          await this.router.navigate(['/']);
        }
      } else {
        this.createToastComponent('warning', '登录失败', '登录的账号或密码不正确');
      }
    } catch (e) {
      console.log(e)
    }

  }

  createToastComponent(state: string, title: string, message: string) {
    this.container.clear();
    const widget = this.container.createComponent(ToastComponent);
    widget.setInput('title', title);
    widget.setInput('state', state);
    widget.setInput('message', message);
  }

}
