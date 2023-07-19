import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {initTE, Input, Ripple, Toast} from "tw-elements";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../login/login.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {matchPassword} from "../../../shared/matchpassword.validator";
import {setToken} from "../../../store/token/token.action";
import {setProfile} from "../../../store/access/access.action";
import {RegisterService} from "./register.service";
import {ToastComponent} from "../../../components/toast/toast.component";
import {Store} from "@ngrx/store";
import {TokenModel} from "../../../store/token/token.model";
import {ProfileModel} from "../../../store/access/access.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule, RouterLink],
  providers: [RegisterService]
})
export class RegisterComponent {
  infoTitleTxt: string;
  infoContentTxt: string;

  profileForm!: FormGroup;

  @ViewChild('container', {read: ViewContainerRef})
  container!: ViewContainerRef;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private tokenStore: Store<TokenModel>,
    private accessStore: Store<ProfileModel>
  ) {
    this.infoTitleTxt = this.registerService.infoTitleTxt;
    this.infoContentTxt = this.registerService.infoContentTxt;
  }

  arrayFrom(obj: any) {
    return Object.keys(obj).length > 0 ? Object.keys(obj).slice(0, 1) : [];
  }

  ngOnInit() {
    initTE({Input, Ripple, Toast});

    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^([a-zA-Z]|[0-9])(\\w|\\-)+@[a-zA-Z0-9]+\\.([a-zA-Z]{2,4})$')]],
      password: ['', [Validators.required, Validators.pattern('^[\\d\\w]{6,12}$')]],
      repassword: ['', [Validators.required, matchPassword('password')]],
    });

  }

  get fullName() {
    return this.profileForm.get('fullName');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get password() {
    return this.profileForm.get('password');
  }

  get repassword() {
    return this.profileForm.get('repassword');
  }

  async HandleRegister() {
    // console.log(this.profileForm.value);
    try {
      const result = await this.registerService.doRegister({...this.profileForm.value, repeat_password: this.profileForm.value.repassword});
      // console.log(result);

      if (result?.error === 0 && result.data?.token) {
        const token = result.data.token;
        this.tokenStore.dispatch(setToken({token: String(token)}));

        const profile = await this.registerService.doProfile();
        // console.log(profile)
        if (profile?.error === 0 && profile.data!) {
          // console.log(profile.data)
          await this.accessStore.dispatch(setProfile(profile.data!));
          // await this.createToastComponent('success', '登录成功', '欢迎回来');
          await this.router.navigate(['/']);
        }
      } else {
        this.createToastComponent('warning', '登录失败', JSON.stringify(result.message));
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
