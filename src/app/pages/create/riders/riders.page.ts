import { Component, OnInit, ViewChild } from '@angular/core';
import {  NavController, NavParams, IonContent } from '@ionic/angular';
import { UserDetail } from '../../../interfaces/userDetail';
import { Booking } from '../../../interfaces/booking';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CallNumber } from '@ionic-native/call-number/ngx';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-riders',
  templateUrl: './riders.page.html',
  styleUrls: ['./riders.page.scss'],
})
export class RidersPage implements OnInit {

  rideId : string;
  bookings : Booking[];

  Users : any[]= [];

  //ickupDroppoints : 

  @ViewChild(IonContent ,{static: false}) content : IonContent

  constructor(private route: ActivatedRoute, private router : Router,private afs : AngularFirestore, private afAuth :AngularFireAuth, private callNumber: CallNumber) {
   if(this.router.getCurrentNavigation().extras.state){
     this.rideId = this.router.getCurrentNavigation().extras.state.rideId;
   }
  }

  ngOnInit() {
    this.loadBookings();
    //console.log(this.Users);
  }


  loadBookings()
  {
    this.afs.collection('bookings',ref => ref.where('rideId' ,'==', this.rideId)).valueChanges().subscribe((data: Booking[]) =>{
      this.bookings = data;

      this.bookings.forEach(element => {
        this.afs.collection('users',ref => ref.where('userId' ,'==', element.userId)).valueChanges().subscribe((userData: UserDetail[]) =>{
          const obj = {...element, ...userData[0]}
          this.Users.push(obj);
          //console.log(this.Users);
        });
      });

  });

  }

callProvider(mobileNumber : string){
  this.callNumber.callNumber(mobileNumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}


  

}
