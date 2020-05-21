import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {BookService} from '../../../../services/book.service';
import {RideService} from '../../../../services/ride.service';
import {Booking} from '../../../../interfaces/booking';
import {Ride} from '../../../../interfaces/ride';
import {AlertController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {  NavController, NavParams } from '@ionic/angular';
import * as firebase from 'firebase/app';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.page.html',
  styleUrls: ['./create-booking.page.scss'],
})
export class CreateBookingPage implements OnInit, OnDestroy {

  rideId: string;
  ride: Ride;
  private ridesSub: Subscription;

  pickupDropPoint : string;
  seatsBooked : number;
  booking : Booking;
  createdAt = new Date();

  constructor(private route: ActivatedRoute, private loaderCtrl : LoadingController, private bookService : BookService,public alertController: AlertController, private rideService :RideService,private navCtrl : NavController ) {
    this.booking = {};
    this.ride = {};
  }

  //@ViewChild('f',{static:true}) form : NgForm;


  ngOnInit() {
    console.log("ngOnInit starts");
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('rideId'))
      {
        this.navCtrl.navigateBack('/rides/tabs/create');
        return;
      }
      this.rideId = paramMap.get('rideId');

      this.ridesSub = this.rideService.getRide(this.rideId).subscribe(ride  =>{
        this.ride= ride;
        console.log(this.ride);
      });
    });
    console.log("ngOnInit ends");
  }

  async createBooking()
  {
    this.booking.seats = this.seatsBooked;
    this.booking.pickupDropPoint = this.pickupDropPoint;
    this.booking.createdAt = firebase.firestore.Timestamp.fromDate(this.createdAt);
    this.booking.rideId = this.rideId;
    this.booking.poolDateTime = this.ride.datetime;
    //console.log(this.booking);

    if(this.checkAvailability(this.seatsBooked, this.ride.seats))
    {

      this.loaderCtrl.create({
        message:'Booking Your Seat...'
      }).then(loadingEl=>{
        loadingEl.present();

        this.bookService.addBooking(this.booking).then(res=>{
          if(res)
            {
              this.bookService.updateSeats(this.ride.seats, this.seatsBooked, this.rideId).catch(error => {
                throw new Error('Unable to update seats');
              })
            }
          }).then(()=>{
              loadingEl.dismiss();
        }).then(async ()=>{

          const alert = await this.alertController.create({
            header: 'Car Pool Booked',
            //subHeader: 'Incorrect Credentials',
            message: this.seatsBooked + 'Seats Booked for you.',
            buttons: [{
              text :'OK',
            handler: () => {
              this.navCtrl.navigateBack('/rides/tabs/book');
            }
            }]
            
          });
          await alert.present();
        })

      })
    }
    else 
    {
      const alert = await this.alertController.create({
        header: 'Check Seats Left',
        //subHeader: 'Incorrect Credentials',
        message: 'Only '+ this.ride.seats +' seat left.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
    //write code for error handling

  checkAvailability(seatsB: number, seatsL :number)
  {
    if(seatsB>seatsL)
    {
      return false;
    }
    else
    {
      return true; 
    }
  }


  ngOnDestroy(){
    if(this.ridesSub){
      this.ridesSub.unsubscribe();
    }
  }

}
