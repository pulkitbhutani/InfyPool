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

  private _userId = this.afAuth.auth.currentUser.uid;

  get userIsAuthenticated(){
    return this._userIsAuthenticated
  }

  get userId(){
    return this._userId;
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
