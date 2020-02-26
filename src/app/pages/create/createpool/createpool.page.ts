import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {RideService} from '../../../services/ride.service';
import {Ride} from '../../../interfaces/ride';
import {  NavController, NavParams } from '@ionic/angular';
//import {firebase} from '@angular/fire/firebase-node';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-createpool',
  templateUrl: './createpool.page.html',
  styleUrls: ['./createpool.page.scss'],
})
export class CreatepoolPage implements OnInit {

  datetime = new Date().toISOString();//.getTime();
  toOffice : boolean = true;
  destination : string;
  locations : string[];
  price : number;
  seats : number;
  createdAt = new Date();
  mills:number;

  ride : Ride;
  points: Observable<any[]>;
  backgroundColor : string;
  minDate: string = new Date().toISOString();
  maxDate = new Date();
  //let firestamp = new ;
  

  constructor(db: AngularFirestore, private rideService: RideService, private navCtrl : NavController ) { 
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
    this.rideService.getRidesByUser();

    this.navCtrl.navigateBack('/tabs/create');
    
  }

  clickToOffice()
  {
    this.toOffice = true;
    this.destination = 'Infosys Jaipur';
    //this.buttonColor = 'success';
    this.backgroundColor = 'success'
    console.log(this.datetime);
    //console.log(this.datetimetest);
    console.log(this.toOffice);
  }

  clickFromOffice()
  {
    this.toOffice = false;
    console.log(this.toOffice);
  }

}
