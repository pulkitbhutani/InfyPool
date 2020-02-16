import { Component, OnInit,  EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {  NavController, NavParams } from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import { auth } from 'firebase/app';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username : string="";
  password : string ="";

  @Output() authState = new EventEmitter();

  constructor(public afAuth: AngularFireAuth, public alertController: AlertController, private navCtrl : NavController,public events: Events) { }

  

  ngOnInit() {
  }

  async login()
  {
    const{username,password} = this

    try{
      const user = await this.afAuth.auth.signInWithEmailAndPassword(username,password);
      if(user)
      {
        console.log("sucessfully logged in");
        window.dispatchEvent(new CustomEvent('user:login'));
        this.navCtrl.navigateForward('/userdetails');
        //this.navCtrl.navigateForward('/tabs');
      }  
    } catch(err){
      console.dir(err)
      if(err.code === "auth/user-not-found"){
        const alert = await this.alertController.create({
          header: 'Incorrect Credentials',
          //subHeader: 'Incorrect Credentials',
          message: 'Please check Username and Password.',
          buttons: ['OK']
        });
        await alert.present();
      }
      else if(err.code ==="auth/invalid-email"){
        const alert = await this.alertController.create({
          header: 'Invalid Email',
          //subHeader: 'Incorrect Credentials',
          message: 'Please enter a correct Email Address',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

}
