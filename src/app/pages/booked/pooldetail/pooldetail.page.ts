import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UserDetail } from '../../../interfaces/userDetail';
import { Ride } from '../../../interfaces/ride';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-pooldetail',
  templateUrl: './pooldetail.page.html',
  styleUrls: ['./pooldetail.page.scss'],
})
export class PooldetailPage implements OnInit {

  rideId : string;
  userId : string;
  firstName : string;
  lastName : string;
  mobileNumber : string;
  carModel: string;
  carColor: string;
  carNumber: string;
  

  constructor(private route: ActivatedRoute, private navCtrl : NavController, private router : Router,private afs : AngularFirestore, private afAuth :AngularFireAuth, private callNumber: CallNumber) 
  { 
    //if(this.router.getCurrentNavigation().extras.state){
   //   this.rideId = this.router.getCurrentNavigation().extras.state.rideId;
   // }

    

    
  }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('rideId'))
      {
        this.navCtrl.navigateBack('/booked');
        return;
      }
      this.rideId = paramMap.get('rideId');
    });
    
    this.afs.collection('rides').doc(this.rideId).valueChanges().subscribe((data: Ride) =>{
        this.userId = data.userId;
        this.loadUserData();
      }
    );
    
  }

  loadUserData(){
    console.log(this.userId);
    //load from userDetails table
    this.afs.collection('users',ref => ref.where('userId' ,'==', this.userId)).valueChanges()
    .subscribe((data: UserDetail[]) =>{
      this.firstName = data[0].firstName;
      this.lastName = data[0].lastName;
      this.mobileNumber = data[0].mobileNumber;
  });

  //load from vehicledetail table
  this.afs.collection('vehicles',ref => ref.where('userId' ,'==', this.userId)).valueChanges()
    .subscribe((data: Vehicle[]) =>{
      this.carColor = data[0].carColor;
      this.carModel = data[0].carModel;
      this.carNumber = data[0].carNumber;
  });

  }

  callProvider(){
    this.callNumber.callNumber(this.mobileNumber, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
