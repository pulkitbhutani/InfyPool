import { Component, OnInit,  EventEmitter, Output, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {  NavController, NavParams } from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { User } from './user.model';
import { auth } from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, OnDestroy {

  userDetailId: string;
  checkSub : Subscription;

  @Output() authState = new EventEmitter();

  constructor(private afs: AngularFirestore,
    public afAuth: AngularFireAuth, 
    public alertController: AlertController,
    private router : Router,
    private authService : AuthService,
    private userService : UserService
    ) { }

  

  ngOnInit() {
  }

  login(form : NgForm)
  {
    this.authService.login(form.value.email,form.value.password).then(authdata => {
      console.log(authdata);

      this.checkSub =  this.userService.checkDetailsExist(authdata.user.uid).subscribe(res=> {
        console.log(res);
        if(res)
        {
          this.router.navigate(['/rides/tabs']);
        }
        else
        {
          this.router.navigate(['/userdetails']);
        }
      });
      
    });
    //console.log(user);
  }

  

  private showAlert(message: string) {
    this.alertController
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }


  ngOnDestroy()
  {
    if(this.checkSub){
      this.checkSub.unsubscribe();
    }
  }

}
