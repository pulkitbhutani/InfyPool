import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePage } from './create.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePage
  },
  { 
    path: 'new', 
    loadChildren: () => import('./new-pool/new-pool.module').then(m=>m.NewPoolPageModule)  
  },
  { 
    path: 'edit/:rideId', 
    loadChildren: () => import('./edit-pool/edit-pool.module').then(m=>m.EditPoolPageModule)  
  },
  { 
    path: 'detail/:rideId', 
    loadChildren: () => import('./pool-detail/pool-detail.module').then(m=>m.PoolDetailPageModule)  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CreatePageRoutingModule {}