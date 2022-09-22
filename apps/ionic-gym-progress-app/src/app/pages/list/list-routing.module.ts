import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPage } from './list.page';

const routes: Routes = [
  {
    path: '',
    component: ListPage
  },
  {
    path: 'list-gyms',
    loadChildren: () => import('./list-gyms/list-gyms.module').then(m => m.ListGymsPageModule)
  },
  {
    path: 'list-machines',
    loadChildren: () => import('./list-machines/list-machines.module').then(m => m.ListMachinesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPageRoutingModule {}
