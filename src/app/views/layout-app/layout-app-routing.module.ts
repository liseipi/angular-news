import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
      path: 'home',
      loadComponent: () => import('./home/home.component').then((x) => x.HomeComponent),
      pathMatch: 'full'
    },
    {
      path: 'hot',
      loadComponent: () => import('./hot/hot.component').then((x) => x.HotComponent),
    },
    {
      path: 'worldwide',
      loadComponent: () => import('./worldwide/worldwide.component').then((x) => x.WorldwideComponent),
    },
    {
      path: 'content/:id',
      loadComponent: () => import('./content/content.component').then((x) => x.ContentComponent),
    },
    {
      path: 'search/:key',
      loadComponent: () => import('./search/search.component').then((x) => x.SearchComponent),
    },
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
  {
    path: 'zk',
    loadComponent: () => import('../../views/layout-app/zk/zk.component').then((x) => x.ZkComponent),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAppRoutingModule {
}
