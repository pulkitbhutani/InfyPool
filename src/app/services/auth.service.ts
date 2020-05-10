import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
//import {Ride} from '../interfaces/ride';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //private rideCollection = this.afs.collection<Ride>('rides');

  private _userIsAuthenticated= false;

  get userIsAuthenticated(){
    return this._userIsAuthenticated
  }

  constructor(public afAuth: AngularFireAuth) { }

  login(){
    this._userIsAuthenticated = true;
  }
  
  logout(){
    this._userIsAuthenticated = false;
  }

  userDetails(){
    return this.afAuth.auth.currentUser;
  }
  
}
