import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppLayoutComponent} from "./layout/app/app-layout/app-layout.component";
import {SiteLayoutComponent} from "./layout/site/site-layout/site-layout.component";

import {NotFoundComponent} from "./views/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    loadChildren: () => import('./views/layout-app/layout-app.module').then(m => m.LayoutAppModule),
  },
  {
    path: '',
    component: AppLayoutComponent,
    loadChildren: () => import('./views/layout-site/layout-site.module').then(m => m.LayoutSiteModule),
  },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 0],
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
