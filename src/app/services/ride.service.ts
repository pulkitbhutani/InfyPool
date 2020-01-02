import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Ride} from '../interfaces/ride';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  
  private rideCollection = this.afs.collection<Ride>('rides');

  userId: string;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.userId =  this.afAuth.auth.currentUser.uid;
}

ngOnInit(){
  
}

  getRides(){
    return this.rideCollection.snapshotChanges();
  }

  getRidesByUser(){
    return this.afs.collection('rides',ref => ref.where('userId' ,'==', this.userId).orderBy('createdAt')).valueChanges();
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
