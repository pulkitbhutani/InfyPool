import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {BookService} from '../../../../services/book.service';
import {RideService} from '../../../../services/ride.service';
import {Booking} from '../../../../interfaces/booking';
import {Ride} from '../../../../interfaces/ride';
import { map } from 'rxjs/operators';
import {AlertController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {  NavController, NavParams } from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.page.html',
  styleUrls: ['./create-booking.page.scss'],
})
export class CreateBookingPage implements OnInit {

  rideId: string;
  ride: Ride;
  locations: string[];
  pickupDropPoint : string;
  toOffice: boolean = true;
  seatsBooked : number;
  seatsLeft : number;
  booking : Booking;
  isValid : boolean;
  poolDateTime : firebase.firestore.Timestamp;
  createdAt = new Date();

  constructor(private route: ActivatedRoute, private bookService : BookService,public alertController: AlertController, private rideService :RideService,private navCtrl : NavController ) {
    this.booking = {};
  }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('rideId'))
      {
        this.navCtrl.navigateBack('/rides/tabs/create');
        return;
      }
      this.rideId = paramMap.get('rideId');
    });

      //gets ride data and fills in the locations.
      this.bookService.getRideData(this.rideId).subscribe((res: Ride) =>{
        this.locations = res.locations;
        this.seatsLeft = res.seats;
        this.toOffice = res.toOffice;
        this.poolDateTime = res.datetime;
        console.log(this.locations);
      });
      

  }

  async createBooking()
  {
    this.booking.seats = this.seatsBooked;
    this.booking.pickupDropPoint = this.pickupDropPoint;
    this.booking.createdAt = firebase.firestore.Timestamp.fromDate(this.createdAt);
    this.booking.rideId = this.rideId;
    this.booking.poolDateTime = this.poolDateTime;
    //console.log(this.booking);

    this.isValid = this.checkAvailability(this.seatsBooked, this.seatsLeft)
    if(this.isValid)
    {
      this.bookService.addBooking(this.booking);
      this.bookService.updateSeats(this.seatsLeft, this.seatsBooked, this.booking.rideId);
      const alert = await this.alertController.create({
        header: 'Car Pool Booked',
        //subHeader: 'Incorrect Credentials',
        message: this.seatsBooked + 'Seats Booked for you.',
        buttons: [{
          text :'OK',
        handler: () => {
          this.navCtrl.navigateBack('/rides/tabs/book');
        }
        }]
        
      });
      await alert.present();
    }
    else 
    {
      const alert = await this.alertController.create({
        header: 'Check Seats Left',
        //subHeader: 'Incorrect Credentials',
        message: 'Not enough seats left.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
    //write code for error handling

  checkAvailability(seatsB: number, seatsL :number)
  {
    if(seatsB>seatsL)
    {
      return false;
    }
    else
    {
      return true; 
    }
  }

}
