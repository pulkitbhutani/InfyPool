import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {BookService} from '../../../services/book.service';
import {RideService} from '../../../services/ride.service';
import {Booking} from '../../../interfaces/booking';
import {Ride} from '../../../interfaces/ride';
import { map } from 'rxjs/operators';
import {AlertController} from '@ionic/angular';
import {  NavController, NavParams } from '@ionic/angular';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.page.html',
  styleUrls: ['./createbooking.page.scss'],
})


export class CreatebookingPage implements OnInit {

  ride: Ride;
  locations: string[];
  pickupDropPoint : string;
  toOffice: boolean = true;
  seatsBooked : number;
  seatsLeft : number;
  booking : Booking;
  isValid : boolean;
  createdAt = new Date();

  constructor(private bookService : BookService,public alertController: AlertController, private rideService :RideService,private navCtrl : NavController ) {
    this.booking = {};
  }

  ngOnInit() {
      //gets ride data and fills in the locations.
      this.bookService.getRideData().subscribe((res: Ride) =>{
        this.locations = res.locations;
        this.seatsLeft = res.seats;
        console.log(this.locations);
      });
      

  }

  async createBooking()
  {
    this.booking.seats = this.seatsBooked;
    this.booking.pickupDropPoint = this.pickupDropPoint;
    this.booking.createdAt = firebase.firestore.Timestamp.fromDate(this.createdAt);
    //console.log(this.booking);

    this.isValid = this.checkAvailability(this.seatsBooked, this.seatsLeft)
    if(this.isValid)
    {
      this.bookService.addBooking(this.booking);

      const alert = await this.alertController.create({
        header: 'Car Pool Booked',
        //subHeader: 'Incorrect Credentials',
        message: this.seatsBooked + 'Seats Booked for you.',
        buttons: [{
          text :'OK',
        handler: () => {
          this.navCtrl.navigateBack('/tabs/book');
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
