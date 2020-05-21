import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {Ride} from '../../../interfaces/ride';
import {BookService} from '../../../services/book.service';
import {RideService} from '../../../services/ride.service';
import {AlertController} from '@ionic/angular';
import {SegmentChangeEventDetail} from '@ionic/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit, OnDestroy {
  
  toOffice: boolean = true;
  ifEmpty : boolean = true;
  rides: Ride[];
  relevantRides : Ride[];
  private ridesSub: Subscription;
 
  constructor(db: AngularFirestore,public alertController: AlertController, private router: Router, private bookService: BookService , private rideService: RideService) { 

  }


  ngOnInit() {
    this.ridesSub = this.rideService.rides.subscribe(rides => {
      this.rides = rides;
      this.relevantRides = this.rides.filter(ride => ride.toOffice == this.toOffice).filter(ride => ride.seats != 0);
    });
  }

  ionViewWillEnter(){
    this.rideService.getRides().subscribe();
  }

  onFilterUpdate(event : CustomEvent<SegmentChangeEventDetail>){
    if(event.detail.value == 'toOffice')
    {
      this.toOffice = true;
      this.relevantRides = this.rides.filter(ride => ride.toOffice == this.toOffice).filter(ride => ride.seats != 0);
    }
    else if(event.detail.value == 'toHome')
    {
      this.toOffice = false;
      this.relevantRides = this.rides.filter(ride => ride.toOffice == this.toOffice).filter(ride => ride.seats != 0);
    }
  }



  async presentAlertConfirm(stops : string[]) {
    
    //below code creates a string of list and plugs in to alert to display the stops.
    let stopsStr = "<ul>"
    let stopsStrEnd = "</ul>"
    for(var stop of stops)
    {
      stopsStr = stopsStr + "<li>" + stop + "</li>"; 
    }
    stopsStr = stopsStr + stopsStrEnd;

    const alert = await this.alertController.create({
      header: 'Stops',
    
      message: stopsStr,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnDestroy(){
    if(this.ridesSub){
      this.ridesSub.unsubscribe();
    }
  }

}
