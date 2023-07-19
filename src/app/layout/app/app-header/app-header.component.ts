import {Component} from '@angular/core';
import {ProfileModel} from "../../../store/access/access.model";
import {select, Store} from "@ngrx/store";
import {TokenModel} from "../../../store/token/token.model";
import {LogoutService} from "../../../service/logout.service";
import {tokenSelect} from "../../../store/token/token.selector";
import {profileSelect} from "../../../store/access/access.selector";
import {Dropdown, initTE, Ripple} from "tw-elements";
import {Router} from "@angular/router";
import {filter, fromEvent, map} from "rxjs";

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  token$: String = '';
  profile$: ProfileModel | null = null;

  constructor(
    private tokenStore: Store<TokenModel>,
    private accessStore: Store<ProfileModel>,
    private logoutService: LogoutService,
    private router: Router,
  ) {
    this.tokenStore.pipe(select(tokenSelect)).subscribe(token => {
      this.token$ = String(token);
    });

    this.accessStore.pipe(select(profileSelect)).subscribe(profile => {
      this.profile$ = profile;
    });
  }

  ngAfterViewInit() {
    initTE({Dropdown, Ripple});

    const el = document.getElementById('search')!;

    // enter
    const searchEvent = fromEvent<KeyboardEvent>(el, 'keyup').pipe(
      filter((event: any) => event.key == 'Enter'),
      map((event: any) => event.target.value),
      map(title => title.trim()),
      filter(title => title != '')
    ).subscribe(value => {
      this.doSearch(value);
    })
  }

  logout() {
    this.logoutService.logout();
  }

  async doSearch(key: string) {
    // console.log(key)
    await this.router.navigate(['/search', key]);
  }
}
