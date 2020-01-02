import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {TabsPage} from './tabs.page';

 const routes : Routes =[
     {
         path: '',
         component: TabsPage,
         children: [    
         { path: 'create', loadChildren: '../create/create.module#CreatePageModule' },
         { path: 'book', loadChildren: '../book/book.module#BookPageModule' },
         { path: 'booked', loadChildren: '../booked/booked.module#BookedPageModule' }
        ]
     }

 ]

 @NgModule({
    imports: [
        RouterModule.forChild(routes)],
        exports: [RouterModule]
  })
  export class TabsRoutingModule {}