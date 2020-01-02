import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {RideService} from '../../../services/ride.service';
import {Ride} from '../../../interfaces/ride';
//import {firebase} from '@angular/fire/firebase-node';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-createpool',
  templateUrl: './createpool.page.html',
  styleUrls: ['./createpool.page.scss'],
})
export class CreatepoolPage implements OnInit {

  datetime = new Date();//.getTime();
  toOffice : boolean = true;
  destination : string;
  locations : string[];
  price : number;
  seats : number;
  createdAt = new Date();
  mills:number;

  ride : Ride;
  points: Observable<any[]>;
  //let firestamp = new ;
  

  constructor(db: AngularFirestore, private rideService: RideService) { 
    this.points = db.collection('pickupdroppoints').valueChanges();
    this.ride = {};
  }
  
  ngOnInit() {
  }

  todo = {}
  logForm() {
    console.log(this.todo)
  }
  
  createRide()
  {
    //below date is formatted again to date from iso
    this.ride.datetime = firebase.firestore.Timestamp.fromDate(new Date(this.datetime));
    this.ride.createdAt = firebase.firestore.Timestamp.fromDate(this.createdAt);
    this.ride.destination = this.destination;
    this.ride.price = this.price;
    this.ride.seats =this.seats;
    this.ride.locations = this.locations;
    this.ride.toOffice = this.toOffice;
    
    this.rideService.addRide(this.ride);
  }

  clickToOffice()
  {
    this.toOffice = true;
    //this.buttonColor = 'success';
    console.log(this.toOffice);
  }

  clickFromOffice()
  {
    this.toOffice = false;
    console.log(this.toOffice);
  }

}
