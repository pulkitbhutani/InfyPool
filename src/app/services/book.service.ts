import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Booking} from '../interfaces/booking';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {Ride} from '../interfaces/ride';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  //private rideCollection = this.afs.collection<Ride>('rides');

  userId: string;
  rideId: string;
  points: Observable<any[]>;
  
  private bookingCollection = this.afs.collection<Ride>('bookings');
  

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.userId =  this.afAuth.auth.currentUser.uid;
}

ngOnInit(){
  
}


  getPickupDropLocations()
  {
    return this.points = this.afs.collection('pickupdroppoints').valueChanges();
  }

  saveCurrentRideId(rideID : string)
  {
    this.rideId = rideID;
  }

  getRideData()
  {
    return this.afs.collection("rides").doc(this.rideId).valueChanges();
  }

  getToFromOffice()
  {

  }

  getUserBookings()
  {
    return this.afs.collection('bookings',ref => ref.where('userId' ,'==', this.userId))
    .valueChanges();
  }

  addBooking(booking: Booking){
    booking.rideId = this.rideId;
    booking.userId = this.userId;

    return this.bookingCollection.add(booking);
  }

}
