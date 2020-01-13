import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {Ride} from '../../interfaces/ride';
import { map } from 'rxjs/operators';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  
  rides: Observable<any[]>;
 
  constructor(db: AngularFirestore, private router: Router, private bookService: BookService ) { 

    //always use snapshotchanges when you want metadata as well with the collection data, it helps with much complex data.
    this.rides = db.collection('rides').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Ride;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

}

  ngOnInit() {
  }

  bookRide(rideId : string)
  {
    console.log(rideId);
    this.router.navigate(['createbooking']);
    this.bookService.saveCurrentRideId(rideId);
     //routerLink="/createbooking" routerDirection="forward"
  }

}
