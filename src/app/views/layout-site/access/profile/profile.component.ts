import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {ProfileModel} from "../../../../store/access/access.model";
import {profileSelect} from "../../../../store/access/access.selector";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProfileComponent {

  profile$: ProfileModel | null = null;

  constructor(
    private accessStore: Store<ProfileModel>,
  ) {
    this.accessStore.pipe(select(profileSelect)).subscribe(profile => {
      this.profile$ = profile;
    });
  }
}
