import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserDetail } from '../../interfaces/userDetail';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userId : string;
  
  rideId : string;
  firstName : string;
  lastName : string;
  mobileNumber : string;
  carModel: string;
  carColor: string;
  carNumber: string;
  //Bool : Boolean = true;


  constructor(private afAuth: AngularFireAuth, private afs : AngularFirestore) { 
    this.userId =  this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    console.log('ngon init starts');
    this.getUserDetails();
    console.log('ngoninti ends');
    //console.log(this.User);
  }

  getUserDetails(){
    
    this.afs.collection('users',ref => ref.where('userId' ,'==', this.userId)).valueChanges()
    .subscribe((data: UserDetail[]) =>{
      this.firstName = data[0].firstName;
      this.lastName = data[0].lastName;
      this.mobileNumber = data[0].mobileNumber;
      console.log(this.firstName);
  });

  //load from vehicledetail table
  this.afs.collection('vehicles',ref => ref.where('userId' ,'==', this.userId)).valueChanges()
    .subscribe((data: Vehicle[]) =>{
      this.carColor = data[0].carColor;
      this.carModel = data[0].carModel;
      this.carNumber = data[0].carNumber;
  });

    

    
  }

  

}
