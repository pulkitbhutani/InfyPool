import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {TabsPage} from './tabs.page';

 const routes : Routes =[
    {
        path: 'tabs',
        //redirectTo: '/places/tabs/discover',
        //pathMatch:'full'
        component: TabsPage,
        children:[
          {
            path: 'create', 
            loadChildren: () => import('./create/create.module').then(m=>m.CreatePageModule) 
        },
        {
            path: 'book', 
            loadChildren:() => import('./book/book.module').then(m=>m.BookPageModule) 
        },  
        {
          path: '',
          redirectTo: '/rides/tabs/book',
          pathMatch:'full'
          //component: PlacesPage
        }
      ]
      },
      {
        path: '',
        redirectTo: '/rides/tabs/book',
        pathMatch:'full'
        //component: PlacesPage
      }
 ]


 @NgModule({
    imports: [
        RouterModule.forChild(routes)],
        exports: [RouterModule]
  })
  export class TabsRoutingModule {}