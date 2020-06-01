import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {UserDetail} from '../interfaces/userDetail';
import { map, take, tap } from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import { firestore } from 'firebase';
import { User } from '../auth/user.model';

export class AuthInfo {
  constructor(public $uid: string) { }

  isLoggedIn() {
    return !!this.$uid;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usercollection = this.afs.collection<UserDetail>('users');
  private _userInfo = new  Subject<UserDetail>();
  
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  get userId(){
    return localStorage.getItem('uid'); 
   }

  get userInfo(){
    return this._userInfo.asObservable();
  }

   public checkAuth() {
    return new Promise((resolve, reject) => { 
      this.afAuth.auth.onAuthStateChanged(user => {
        console.log(user);
        if (user){
          localStorage.setItem('uid', user.uid);
          resolve(user);
        } else {
          this.logout();
          localStorage.clear();
          resolve(false);
        } 
      });
    });
  }


  /* //checks if additiona
  checkUserDetailsExist(user : string)
    {
        console.log(user);
        return this.usercollection.doc('user').valueChanges().pipe(tap(user=> {
          if(!user)
          {
            this._userInfo = undefined;
          }
          else
          {
            console.log(user);
            this._userInfo.next(user);
          }
        }));
    } */

  login(email : string, password : string){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
    //this._userIsAuthenticated = true;
  }
  
  register(email: string, password: string)
  {
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  getUserProfile(uid : string)
  {

  }

  public logout(): Promise<void> {
    //this.authInfo$.next(ApisService.UNKNOWN_USER);
    // this.db.collection('users').doc(localStorage.getItem('uid')).update({ "fcm_token": firebase.firestore.FieldValue.delete() })
    return this.afAuth.auth.signOut();
    
  }
  


}
