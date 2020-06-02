import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {RideService} from '../../../../services/ride.service';
import {UserService} from '../../../../services/user.service';
import {Ride} from '../../../../interfaces/ride';
import {UserDetail} from '../../../../interfaces/userDetail';
import {NavController, NavParams } from '@ionic/angular';
import {AlertController} from '@ionic/angular';
//import {firebase} from '@angular/fire/firebase-node';
import * as firebase from 'firebase/app';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-new-pool',
  templateUrl: './new-pool.page.html',
  styleUrls: ['./new-pool.page.scss'],
})
export class NewPoolPage implements OnInit {
  
  datetime = new Date().toISOString();//.getTime();
  toOffice : boolean = true;
  destination : string = 'Infosys Jaipur';
  locations : string[];
  price : number;
  seats : number;
  createdAt = new Date();

  ride : Ride;
  points: Observable<any[]>;
  curDate = new Date();

  constructor(private db: AngularFirestore, private loaderCtrl : LoadingController, private rideService: RideService,public alertController: AlertController, private navCtrl : NavController, private userService : UserService ) { 
    this.ride = {};
  }
  
  ngOnInit() {

    this.points = this.db.collection('pickupdroppoints').valueChanges(); 
    this.curDate.setHours(0,0,0,0);

    //this.destination = 'Infosys Jaipur';
    
  }

  async createRide()
  { 

    if(this.checkPoolTime(this.datetime))
      {
      //below date is formatted again to date from iso
      this.ride.datetime = firebase.firestore.Timestamp.fromDate(new Date(this.datetime));
      this.ride.createdAt = firebase.firestore.Timestamp.fromDate(this.createdAt);
      this.ride.destination = this.destination;
      this.ride.price = this.price;
      this.ride.seats =this.seats;
      this.ride.locations = this.locations;
      this.ride.toOffice = this.toOffice;
      
      this.loaderCtrl.create({
        message:'Creating Your Ride...'
      }).then(loadingEl=>{
        loadingEl.present();

        this.rideService.addRide(this.ride).then(res=>{
          if(res)
          {
            loadingEl.dismiss();
          }
        }).then(async ()=>{

          const alert = await this.alertController.create({
            header: 'Car Pool Created',
            //subHeader: 'Incorrect Credentials',
            message: 'Car Pool Sucessfully Created',
            buttons: [{
              text :'OK',
            handler: () => {
              this.rideService.getRidesByUser();
              this.navCtrl.navigateBack('/rides/tabs/create');
            }
            }]
            
          });
          await alert.present();

        });
      })
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

  toggleToOffice()
  {
    this.toOffice = !this.toOffice;

    if(this.toOffice == true)
    {
      this.destination = 'Infosys Jaipur';
      console.log('value of to office : ' + this.toOffice)
    }
    else
    {
      this.userService.getCurrentUserStartPoint().subscribe((res: UserDetail[]) => {
        this.destination = res[0].startPoint;
        console.log(this.destination);
        });
    
        console.log(this.destination);
    }
  }

  checkPoolTime(poolDateTime : string)
  {
    
    if(new Date()< new Date(poolDateTime))
    {
      return true;
    }
    else
    {
      return false;
    }
  }


}
