import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {BookService} from '../../../services/book.service';
import {Booking} from '../../../interfaces/booking';
import {Ride} from '../../../interfaces/ride';
import { map } from 'rxjs/operators';
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
  booking : Booking;
  createdAt = new Date();

  constructor(private bookService : BookService) {
    this.booking = {};
  }

  ngOnInit() {
      //gets ride data and fills in the locations.
      this.bookService.getRideData().subscribe((res: Ride) =>{
        this.locations = res.locations;
        console.log(this.locations);
      });
  }

  createBooking()
  {
    this.booking.seats = this.seatsBooked;
    this.booking.pickupDropPoint = this.pickupDropPoint;
    this.booking.createdAt = firebase.firestore.Timestamp.fromDate(this.createdAt);
    
    //console.log(this.booking);
    const res = this.bookService.addBooking(this.booking);
    //write code for error handling.

  }

}
