import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private authServ: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): any {

    return this.authServ.checkAuth().then((user: any) => {
        if (user) {  
          
          localStorage.setItem('uid', user.uid);
          
          return true;
        } else {
            this.router.navigate(['auth']);
        }
    }).catch(error => {
        console.log(error);
        this.router.navigate(['auth']);
    });

}
}
