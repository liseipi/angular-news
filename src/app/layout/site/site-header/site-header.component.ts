import {Component} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, fromEvent, map} from "rxjs";
import {TokenModel} from "../../../store/token/token.model";
import {select, Store} from "@ngrx/store";
import {tokenSelect} from "../../../store/token/token.selector";
import {ProfileModel} from "../../../store/access/access.model";
import {profileSelect} from "../../../store/access/access.selector";
import {
  Dropdown,
  Ripple,
  initTE
} from "tw-elements";
import {LogoutService} from "../../../service/logout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent {
  token$: String = '';
  profile$: ProfileModel | null = null;

  constructor(
    private router: Router,
    private tokenStore: Store<TokenModel>,
    private accessStore: Store<ProfileModel>,
    private logoutService: LogoutService
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
    // input
    // const searchInput = fromEvent(el, 'keyup').pipe(
    //   debounceTime(700),
    //   map((event: any) => <HTMLInputElement>(event.target).value),
    //   distinctUntilChanged(),
    // ).subscribe(value => {
    //   console.log(value)
    // });

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
