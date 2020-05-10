import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {PoolDetailPageRoutingModule} from './pooldetail-routing.module';
import { PooldetailPage } from './pooldetail.page';

const routes: Routes = [
  {
    path: '',
    component: PooldetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PoolDetailPageRoutingModule
  ],
  declarations: [PooldetailPage]
})
export class PooldetailPageModule {}
