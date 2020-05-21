import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Ride} from '../interfaces/ride';
import {ChatRoom} from '../interfaces/chatRoom';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, observable,forkJoin, of, from , BehaviorSubject} from 'rxjs';
import { map,flatMap, concatMap, mergeMap, switchMap, tap, take } from 'rxjs/operators';
import { UserDetail } from '../interfaces/userDetail';
import * as firebase from 'firebase/app';
import {UserService} from '../services/user.service';

import { resolve } from 'url';
import { element } from 'protractor';


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
  private _rides = new  BehaviorSubject<Ride[]>([])

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private userService : UserService) {
    this.userId =  this.afAuth.auth.currentUser.uid;
    this.datetimeTimestamp = firebase.firestore.Timestamp.fromDate(new Date(this.datetime))
}

get rides(){
  return this._rides.asObservable();
} 


ngOnInit(){
  
}

  getRide(rideId : string)
  {
    //using take(1) as this data is needed only once, not stream is needed.
    return this.afs.collection("rides").doc(rideId).valueChanges().pipe(take(1), map((ride: Ride)=>{
      return ride;
    }));
  }

  getRides(){

    //return this.rideCollection.snapshotChanges();
    //return this.afs.collection('rides', ref=> ref.where('toOffice','==', true).orderBy('createdAt')).snapshotChanges();
    //always use snapshotchanges when you want metadata as well with the collection data, it helps with much complex data.
    var ridesObservable = this.afs.collection('rides',ref=>ref.where('datetime','>=',this.datetimeTimestamp)
    .orderBy('datetime')).snapshotChanges().pipe(
      map(actions =>   actions.map(a => {
        const data = a.payload.doc.data() as Ride;
         data.id = a.payload.doc.id;
        return {...data};
      })
   ), tap(rides=> {
    this._rides.next(rides); 
    
  })
  
  );


      /* ridesObservable.subscribe((data : Ride[])=>{
        this.ridesArr = data;
        this.ridesArrNew = [];
        this.ridesArr.forEach(element =>{
          this.afs.collection('users',ref => ref.where('userId' ,'==', element.userId)).valueChanges().subscribe((userData: UserDetail[]) =>{
            const obj = {...element, ...userData[0]}
            this.ridesArrNew.push(obj);
            //console.log(this.Users);
          });
        });
      }
      ) */
      return ridesObservable;
      //return ridesObservable;
      
      
      //var finalRideObservable = ridesObservable.pipe(mergeMap(x => forkJoin((b:Ride) => this.getUserName(b))));  

    
      //console.log(ridesObservable);
      //console.log(finalRideObservable);
      //console.log(ridesObservable);
      //return finalRideObservable;
       /*  this.afs.collection('users',ref1 => ref1.where('userId' ,'==', data.userId)).snapshotChanges().pipe(
          map(actions1 => actions1.map(a1 => {
            const data1 = a1.payload.doc.data() as UserDetail;
            const userName = data1.firstName;
            data.userName = userName;
            console.log(data.userName); */
        

      //})));

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
