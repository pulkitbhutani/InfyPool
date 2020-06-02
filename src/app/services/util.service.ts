import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private alertController : AlertController, private router : Router) { }

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
