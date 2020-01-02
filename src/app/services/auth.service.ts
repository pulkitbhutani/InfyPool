import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
//import {Ride} from '../interfaces/ride';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //private rideCollection = this.afs.collection<Ride>('rides');

  constructor(public afAuth: AngularFireAuth) { }

  userDetails(){
    return this.afAuth.auth.currentUser;
  }
}
