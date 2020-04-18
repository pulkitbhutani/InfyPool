import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {Ride} from '../../interfaces/ride';
import { map } from 'rxjs/operators';
import {BookService} from '../../services/book.service';
import {RideService} from '../../services/ride.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  
  rides: Observable<any[]>;
  //rides: Ride[];
  toOffice: boolean = true;
  //ridea: Subscription;
 
  constructor(db: AngularFirestore,public alertController: AlertController, private router: Router, private bookService: BookService , private rideService: RideService) { 

  }

  ngOnInit() {
     this.rides = this.rideService.getRides(true);

     //console.log('in page ts - after service call');
     //console.log(this.ride);
    //this.rides.subscribe((data:Ride[]) => {
     // this.ride = data
      //console.log(this.ride);
    //});
    //console.log(this.rides);
  }

  bookRide(rideId : string) {
    //console.log(rideId);
    this.router.navigate(['createbooking']);
    this.bookService.saveCurrentRideIdAndDateTime(rideId);
     //routerLink="/createbooking" routerDirection="forward"
  }

  listToOffice()
  { 
    this.toOffice = true;
    this.rides = this.rideService.getRides(this.toOffice);
  }

  listFromOffice()
  {
    this.toOffice = false;
    this.rides = this.rideService.getRides(this.toOffice)
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
