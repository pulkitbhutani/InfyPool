import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PooldetailPage } from './pooldetail.page';

const routes: Routes = [
  {
    path: '',
    component: PooldetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoolDetailPageRoutingModule {}