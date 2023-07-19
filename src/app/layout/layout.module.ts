import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AppLayoutComponent} from "./app/app-layout/app-layout.component";
import {AppHeaderComponent} from "./app/app-header/app-header.component";
import {AppFooterComponent} from "./app/app-footer/app-footer.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {SiteLayoutComponent} from './site/site-layout/site-layout.component';
import {SiteHeaderComponent} from './site/site-header/site-header.component';
import {SiteFooterComponent} from './site/site-footer/site-footer.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    AppHeaderComponent,
    AppFooterComponent,
    SiteLayoutComponent,
    SiteHeaderComponent,
    SiteFooterComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    AppLayoutComponent,
    AppHeaderComponent,
    AppFooterComponent,
    SiteLayoutComponent,
    SiteHeaderComponent,
    SiteFooterComponent
  ]
})
export class LayoutModule {
}
