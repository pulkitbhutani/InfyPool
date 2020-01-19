import { Component, OnInit } from '@angular/core';
import {RideService} from '../../services/ride.service';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ride } from '../../interfaces/ride';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  
  //rides : Observable<any[]>;
  rides : Ride[];
  //rides: 
  constructor(private rideService: RideService) { 
    //this.rides = db.collection('rides').valueChanges();
    //this.rides = rideService.getRides();
  }

  ngOnInit() {
    this.getRideByUser()
  }


  getRideByUser()
  {
    this.rideService.getRidesByUser().subscribe((data : Ride[]) => 
    {this.rides = data}
    );
  }

}
