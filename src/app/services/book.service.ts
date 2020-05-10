import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Booking} from '../interfaces/booking';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {Ride} from '../interfaces/ride';
import {RideService} from '../services/ride.service';
import {AlertController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  //private rideCollection = this.afs.collection<Ride>('rides');

  userId: string;
  rideId: string;
  seatsLeft : number;
  points: Observable<any[]>;
  poolDateTime : firebase.firestore.Timestamp;
  datetime = new Date();
  datetimeTimestamp : firebase.firestore.Timestamp;
  
  private bookingCollection = this.afs.collection<Ride>('bookings');
  

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private rideService: RideService, public alertController :AlertController) {
    this.userId =  this.afAuth.auth.currentUser.uid;
    this.datetime.setHours(0,0,0,0);
    this.datetimeTimestamp = firebase.firestore.Timestamp.fromDate(new Date(this.datetime));
}

ngOnInit(){
  
}


  getPickupDropLocations()
  {
    return this.points = this.afs.collection('pickupdroppoints').valueChanges();
  }

  //saves user clicked rideID into local variable of bookingService, this will be saved with booking when user books the ride.
  saveCurrentRideIdAndDateTime(rideID : string)
  {
    this.rideId = rideID;
    this.rideService.getRideInfo(this.rideId).subscribe((res: Ride) =>{
    this.poolDateTime = res.datetime;
    this.seatsLeft = res.seats;
    });
  }

  //returns ride data for the currently selected ride.
  getRideData(rideId: string)
  {
    return this.afs.collection("rides").doc(rideId).valueChanges();
  }

  getToFromOffice()
  {

  }

  //future changes to be done - minus 10 minutes nano seconds so booking is visibe 10 minutes after the start of ride.
  getUserBookings(){

    //return this.rideCollection.snapshotChanges();
    //return this.afs.collection('rides', ref=> ref.where('toOffice','==', true).orderBy('createdAt')).snapshotChanges();
    //always use snapshotchanges when you want metadata as well with the collection data, it helps with much complex data.
    return this.afs.collection('bookings',ref => ref.where('userId' ,'==', this.userId).where('poolDateTime','>=',this.datetimeTimestamp)
    .orderBy('poolDateTime','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Booking;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    //work on this later- for having pooldatetime at just one place, right now it needs to be updated in both rides ad booking tables.
    /* this.afs.collection('bookings',ref => ref.where('userId' ,'==', this.userId)).valueChanges().subscribe((data: Booking[]) =>{
      data.forEach(element => {
        this.afs.collection('rides',ref => ref.where('rideId' ,'==', element.rideId).where('poolDateTime','>=',this.datetimeTimestamp))
        .valueChanges().subscribe((rideData: Ride[]) =>{
          if(rideData)
          {
            const obj = {...element, ...rideData[0]}
            this.bookings1.push(obj);
          }
          //console.log(this.Users);
        });
      });

  }); */
    
    
  }

 addBooking(booking: Booking){
    booking.userId = this.userId;
  
    //update the number of seats left
    //booking.poolDateTime = this.poolDateTime;
    
    return this.bookingCollection.add(booking);
  }

  updateSeats(seatsL : number, seatsB : number, rideId : string)
  {
    this.afs.collection('rides').doc(rideId).update({
      seats : seatsL - seatsB
    });

  }

  cancelBooking(bookingId: string, rideId :string, seatsBooked : number)
  {
    this.saveCurrentRideIdAndDateTime(rideId);
    //update seats for the booking
    this.afs.collection('rides').doc(rideId).update({
      seats : parseInt(this.seatsLeft.toString()) + parseInt(seatsBooked.toString())
    });

    //delete booking
    this.afs.collection('bookings').doc(bookingId).delete();
  }

}
