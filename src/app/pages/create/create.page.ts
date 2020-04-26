import { Component, OnInit } from '@angular/core';
import {RideService} from '../../services/ride.service';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ride } from '../../interfaces/ride';
import {AlertController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  
  rides : Observable<any[]>;
  datetime = new Date();
  datetimeTimestamp : firebase.firestore.Timestamp;
  //rides : Ride[];
  //rides: 
  constructor(private rideService: RideService, public alertController: AlertController,private navCtrl : NavController, private router : Router) { 
    //this.rides = db.collection('rides').valueChanges();
    //this.rides = rideService.getRides();
    this.datetimeTimestamp = firebase.firestore.Timestamp.fromDate(new Date(this.datetime));
  }

  ngOnInit() {
    this.getRideByUser()
  }


  getRideByUser()
  {
    this.rides = this.rideService.getRidesByUser();
    console.log(this.rides);
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

  //uses new functionality in angular 7.2.2, route state, can pass data with a route as a state, link - https://www.youtube.com/watch?v=XyLcPdv1LKM
  poolChatPage(rideId: string)
  {
    let navigationExtras : NavigationExtras = {
      state:{
        rideId
      }
    }
    this.router.navigate(['/chat'], navigationExtras);  
  }

  ridersPage(rideId: string)
  {
    let navigationExtras : NavigationExtras = {
      state:{
        rideId
      }
    }
    this.router.navigate(['/riders'], navigationExtras);  
  }

}
