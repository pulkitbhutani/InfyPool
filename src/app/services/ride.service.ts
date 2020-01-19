import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Ride} from '../interfaces/ride';
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
  datetime = new Date();
  datetimeTimestamp : firebase.firestore.Timestamp;
   

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.userId =  this.afAuth.auth.currentUser.uid;
    this.datetimeTimestamp = firebase.firestore.Timestamp.fromDate(new Date(this.datetime))
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
    //return this.afs.collection('rides',ref => ref.where('userId' ,'==', this.userId).orderBy('createdAt'))
    //.valueChanges();
    return this.afs.collection('rides',ref => ref.where('userId' ,'==', this.userId).where('datetime','>=',this.datetimeTimestamp).orderBy('datetime'))
    .valueChanges();
  }

  addRide(ride: Ride){
    ride.userId = this.userId;
    return this.rideCollection.add(ride);
  }

  updateRide(id: number, ride: Ride){

  }

  deleteRide(id: number){

  }
}
