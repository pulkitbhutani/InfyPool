import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookPage } from './book.page';

const routes: Routes = [
  {
    path: '',
    component: BookPage
  },
  { 
    path: ':rideId/new', 
    loadChildren: () => import('./create-booking/create-booking.module').then(m=>m.CreateBookingPageModule)  
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BookPageRoutingModule {}