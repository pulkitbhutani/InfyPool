import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {Ride} from '../../interfaces/ride';
import { map } from 'rxjs/operators';
import {BookService} from '../../services/book.service';
import {RideService} from '../../services/ride.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  
  rides: Observable<any[]>;
  toOffice: boolean;
 
  constructor(db: AngularFirestore, private router: Router, private bookService: BookService , private rideService: RideService) { 

  }

  ngOnInit() {
    this.rides = this.rideService.getRides(true);
    //console.log(this.rides);
  }

  bookRide(rideId : string)
  {
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

}
