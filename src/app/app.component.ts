import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate : any;
  loggedIn = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private afAuth: AngularFireAuth,
    private router: Router
  ) 
  {
    this.initializeApp();
  }

  async ngOnInit(){
    //this.checkLoginStatus();
   // this.listenForLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /* isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }

  async checkLoginStatus() {
    const user = await this.isLoggedIn(); 
    if(user)
    {
      setTimeout(() => {
        this.loggedIn = true;
      }, 300);
      this.router.navigate(['/rides/tabs/create']);
    }
    else
    {
      this.router.navigate(['/auth'])
    }
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });
  } */

  logout() {
    this.afAuth.auth.signOut();
    this.loggedIn = false;
    this.router.navigate(['/auth']);
  }

  
}
