import { Component, OnInit } from '@angular/core';
import {RideService} from '../../services/ride.service';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ride } from '../../interfaces/ride';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  
  rides : Observable<any[]>;
  //rides : Ride[];
  //rides: 
  constructor(private rideService: RideService, public alertController: AlertController) { 
    //this.rides = db.collection('rides').valueChanges();
    //this.rides = rideService.getRides();
  }

  ngOnInit() {
    this.getRideByUser()
  }


  getRideByUser()
  {
    this.rides = this.rideService.getRidesByUser();
  }

  async cancelPool(rideId: string)
  {
    const alert = await this.alertController.create({
      header: 'Cancel Pool',
      //subHeader: 'Incorrect Credentials',
      message: 'Cancel your Pool?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: () => {
          //console.log(rideId);
          this.rideService.cancelPool(rideId);
        }
      }]
    });
    await alert.present();
  }

}
