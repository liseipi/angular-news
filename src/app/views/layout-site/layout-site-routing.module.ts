import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((x) => x.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then((x) => x.RegisterComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./access/profile/profile.component').then((x) => x.ProfileComponent),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutSiteRoutingModule {
}
