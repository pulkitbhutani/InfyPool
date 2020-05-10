import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',redirectTo:'rides', pathMatch: 'full' },
    //loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'booked', loadChildren: './pages/booked/booked.module#BookedPageModule' },
  { path: 'rides', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},

  { path: 'userdetails', loadChildren: './pages/userdetails/userdetails.module#UserdetailsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
