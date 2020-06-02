import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  username:string = "";
  password:string = "";

  
  constructor(public afAuth: AngularFireAuth, 
    public alertController: AlertController, 
    public router: Router,
    private authService : AuthService) { }

  ngOnInit() {
  }

  

  register(form: NgForm)
  {
    if(form.valid)
    {
      this.authService.register(form.value.email, form.value.password).then(resData=>{
        console.log(resData);
        this.router.navigate(['/userdetails']);
      });
   }
  }


  async showAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons:[{
        text: 'Ok',
        handler: () => {
          this.router.navigate['/userdetails']
        }
      }]
      
    });

    await alert.present();
  }

}
