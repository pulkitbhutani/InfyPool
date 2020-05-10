import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {Ride} from '../../../interfaces/ride';
import { map } from 'rxjs/operators';
import {BookService} from '../../../services/book.service';
import {RideService} from '../../../services/ride.service';
import {AlertController} from '@ionic/angular';
import {SegmentChangeEventDetail} from '@ionic/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  
  rides: Observable<any[]>;
  //rides: any[];
  toOffice: boolean = true;
  ifEmpty : boolean = true;
  //ridea: Subscription;
 
  constructor(db: AngularFirestore,public alertController: AlertController, private router: Router, private bookService: BookService , private rideService: RideService) { 

  }

  ngOnInit() {
     this.rides = this.rideService.getRides(true);
      this.checkIfEmpty(this.rides);
    console.log(this.rides);
     //console.log('in page ts - after service call');
     //console.log(this.ride);
    //this.rides.subscribe((data:Ride[]) => {
     // this.ride = data
      //console.log(this.ride);
    //});
    //console.log(this.rides);
  }

  checkIfEmpty(data :Observable<any[]>)
  {
    data.subscribe((x:any[]) => {
      if(x.length == 0)
      {
        this.ifEmpty = true;
      }
      else{
        this.ifEmpty = false;
      }
    })
  }

  onFilterUpdate(event : CustomEvent<SegmentChangeEventDetail>){
    if(event.detail.value == 'toOffice')
    {
      this.listRides(true);
    }
    else if(event.detail.value == 'toHome')
    {
      this.listRides(false);
    }
  }

  listRides(bool: boolean){
    this.rides = this.rideService.getRides(bool);
    this.checkIfEmpty(this.rides);
  }


  doRefresh(event) {
    console.log('Begin async operation');
    this.rides = this.rideService.getRides(this.toOffice);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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

}
