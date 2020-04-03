import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Ride} from '../interfaces/ride';
import {ChatRoom} from '../interfaces/chatRoom';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class RideService {
  
  private rideCollection = this.afs.collection<Ride>('rides');

  userId: string;
  seatsLeft: number;
  idss: string[];
  datetime = new Date();
  datetimeTimestamp : firebase.firestore.Timestamp;
  chatRoom : ChatRoom;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.userId =  this.afAuth.auth.currentUser.uid;
    this.datetimeTimestamp = firebase.firestore.Timestamp.fromDate(new Date(this.datetime))
    this.chatRoom = {};
}

ngOnInit(){
  
}

  getRides(toOffice : boolean){
    //return this.rideCollection.snapshotChanges();
    //return this.afs.collection('rides', ref=> ref.where('toOffice','==', true).orderBy('createdAt')).snapshotChanges();
    //always use snapshotchanges when you want metadata as well with the collection data, it helps with much complex data.
    return this.afs.collection('rides',ref=>ref.where('toOffice','==', toOffice).where('datetime','>=',this.datetimeTimestamp)
    .orderBy('datetime')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Ride;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getRidesByUser(){
    //console.log(this.userId);
    //console.log(this.datetimeTimestamp);
    //return this.afs.collection('rides',ref => ref.where('userId' ,'==', this.userId).orderBy('createdAt'))
    //.valueChanges();
    //return this.afs.collection('rides',ref => ref.where('userId' ,'==', this.userId).where('datetime','>=',this.datetimeTimestamp))
    //.orderBy('datetime'))
    //.valueChanges();
    return this.afs.collection('rides',ref => ref.where('userId' ,'==', this.userId)
    .where('datetime','>=',firebase.firestore.Timestamp.fromDate(new Date(this.datetime.setHours(0,0,0,0))))
    .orderBy('datetime')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Ride;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getRideInfo(rideId : string)
  {
    return this.afs.collection("rides").doc(rideId).valueChanges();
  }

  addRide(ride: Ride){
    ride.userId = this.userId;
    
    var newRide = this.rideCollection.add(ride)
    //.then(docRef=>{
    //this.chatRoom.rideId = docRef.id;
    //this.chatRoom.userId.push(this.afAuth.auth.currentUser.uid);
    //this.chatRoom.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
    //console.log(this.chatRoom);
    
      //this.createChatRoom(docRef.id);
    //});
    //this.createChatRoom(newRide);
    return newRide;
  }

  createChatRoom(newRideId)
  {
    this.chatRoom.rideId = newRideId;
    this.chatRoom.userId.push(this.afAuth.auth.currentUser.uid.toString());
    this.chatRoom.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
    console.log(this.chatRoom);
    //return this.chatRoom;
    //this.chatRoom.rideId = rideDetail.id;
    //this.afs.collection<ChatRoom>('chatRooms').add(this.chatRoom);
  }

  updateRide(id: number, ride: Ride){

  }

  cancelPool(rideId :string)
  {
    //update seats for the booking
    //delete booking
    this.afs.collection('rides').doc(rideId).delete();
    //var deleteBookings_query = this.afs.collection('bookings').
    var deleteBookings_query = this.afs.collection('bookings',ref=>ref.where('rideId','==',rideId));
    
    //gets all the bookings for the canceled pool
    var bookingIds = deleteBookings_query.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.id;
      }))
    );
    
    //cancels all the booking for the canceled pool.
    bookingIds.subscribe(res =>{
      this.idss = res;
      for(var id of this.idss)
      {
        this.afs.collection('bookings').doc(id).delete();
      }
    });
  }
  
}
