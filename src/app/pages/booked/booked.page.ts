import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import { Booking } from '../../interfaces/booking';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.page.html',
  styleUrls: ['./booked.page.scss'],
})
export class BookedPage implements OnInit {

  bookings: Observable<any[]>;

  constructor(private bookService : BookService) { }

  ngOnInit() {
    //this.getUserBookings();
    //this.bookService.getUserBookings().subscribe((data : Booking[]) => 
    //{this.bookings = data;
    //console.log(data);
    //});
    this.bookings = this.bookService.getUserBookings();
  }

  cancelBooking(bookingId : string, rideId: string, bookedSeats : number)
  {
    this.bookService.cancelBooking(bookingId,rideId, bookedSeats);
  }

}
