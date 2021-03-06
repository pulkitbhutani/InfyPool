import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import { Booking } from '../../interfaces/booking';
import { Observable } from 'rxjs';
import {AlertController} from '@ionic/angular';
import {  NavController, NavParams } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {Ride} from '../../interfaces/ride';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-booked',
  templateUrl: './booked.page.html',
  styleUrls: ['./booked.page.scss'],
})
export class BookedPage implements OnInit {

  bookings: Observable<any[]>;
  poolStarted : boolean;
  datetime = new Date();
  datetimeTimestamp : firebase.firestore.Timestamp;
  bookingLabel : string;

  constructor(private afs: AngularFirestore,private afAuth: AngularFireAuth,private bookService : BookService, public alertController: AlertController,private navCtrl : NavController,private router : Router) {

  }

  ngOnInit() {
    //this.getUserBookings();
    //this.bookService.getUserBookings().subscribe((data : Booking[]) => 
    //{this.bookings = data;
    //console.log(data);
    //});
    this.bookings = this.bookService.getUserBookings();

    

    this.datetimeTimestamp = firebase.firestore.Timestamp.fromDate(new Date(this.datetime));

    
  }

  async cancelBooking(bookingId : string, rideId: string, bookedSeats : number)
  {
    const alert = await this.alertController.create({
      header: 'Cancel',
      //subHeader: 'Incorrect Credentials',
      message: 'Cancel your Booking ?',
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
          this.bookService.cancelBooking(bookingId,rideId, bookedSeats);
        }
      }]
    });
    await alert.present();
  } 

  poolChatPage(rideId: string)
  {
    let navigationExtras : NavigationExtras = {
      state:{
        rideId
      }
    }
    this.router.navigate(['/chat'], navigationExtras); 
  }

  poolDetailPage(rideId: string)
  {
    let navigationExtras : NavigationExtras = {
      state:{
        rideId
      }
    }
    this.router.navigate(['/pooldetail'], navigationExtras); 
  }

  
}

