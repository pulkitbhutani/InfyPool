import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedPage } from './booked.page';

const routes: Routes = [
  {
    path: '',
    component: BookedPage
  },
  { 
    path: ':rideId', 
    loadChildren: () => import('./pooldetail/pooldetail.module').then(m=>m.PooldetailPageModule)  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BookedPageRoutingModule {}