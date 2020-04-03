import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {RideService} from '../../../services/ride.service';
import {UserService} from '../../../services/user.service';
import {Ride} from '../../../interfaces/ride';
import {UserDetail} from '../../../interfaces/userDetail';
import {NavController, NavParams } from '@ionic/angular';
import {AlertController} from '@ionic/angular';
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
  curDate = new Date();
  minDate : string;
  isValid : boolean;
  curDateTime = new Date();

  
  //minDate = new Date().toISOString();
  //maxDate = new Date();
  //let firestamp = new ;
  

  constructor(db: AngularFirestore, private rideService: RideService,public alertController: AlertController, private navCtrl : NavController, private userService : UserService ) { 
    this.points = db.collection('pickupdroppoints').valueChanges();
    this.ride = {};
    
    //this.curDate.toISOString();
    //console.log(this.minDate);
  }
  
  ngOnInit() {
    this.curDate.setHours(0,0,0,0);
    this.minDate = this.curDate.toISOString();

    //ride to be selected as to office by default.
    this.toOffice = true;
    this.destination = 'Infosys Jaipur';
    //this.buttonColor = 'success';
    this.backgroundColor = 'success';
    console.log(this.minDate);
  }

  todo = {}
  logForm() {
    console.log(this.todo)
  }
  
  async createRide()
  {

    this.isValid = this.checkPoolTime(this.datetime);
    
    if(this.isValid)
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

    const alert = await this.alertController.create({
      header: 'Car Pool Created',
      //subHeader: 'Incorrect Credentials',
      message: 'Car Pool Sucessfully Created',
      buttons: [{
        text :'OK',
      handler: () => {
        this.rideService.getRidesByUser();
        this.navCtrl.navigateBack('/tabs/create');
      }
      }]
      
    });
    await alert.present();

    }

    else 
    {
      const alert = await this.alertController.create({
        header: 'Check Pool Time',
        //subHeader: 'Incorrect Credentials',
        message: 'Time Selected in Past',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  clickToOffice()
  {
    this.toOffice = true;
    this.destination = 'Infosys Jaipur';
    //this.buttonColor = 'success';
    this.backgroundColor = 'success';
    console.log(this.datetime);
    //console.log(this.datetimetest);
    console.log(this.toOffice);
  }

  checkPoolTime(poolDateTime : string)
  {
    
    if(this.curDateTime< new Date(poolDateTime))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  clickFromOffice()
  {
    this.toOffice = false;
    this.userService.getCurrentUserStartPoint().subscribe((res: UserDetail[]) => {
    this.destination = res[0].startPoint;
    console.log(this.destination);
    });

    console.log(this.destination);
  }

}
