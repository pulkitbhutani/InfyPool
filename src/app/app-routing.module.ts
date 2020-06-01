import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '',redirectTo:'rides', pathMatch: 'full' },
    //loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'booked', loadChildren: './pages/booked/booked.module#BookedPageModule', canActivate: [AuthGuard] },
  { path: 'rides', loadChildren: './pages/tabs/tabs.module#TabsPageModule' , canActivate: [AuthGuard]},

  { path: 'userdetails', loadChildren: './pages/userdetails/userdetails.module#UserdetailsPageModule', canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' , canActivate: [AuthGuard]},
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' , canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
