import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {BookedPageRoutingModule} from './booked-routing.module';
import { BookedPage } from './booked.page';

const routes: Routes = [
  {
    path: '',
    component: BookedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BookedPageRoutingModule
  ],
  declarations: [BookedPage]
})
export class BookedPageModule {}
