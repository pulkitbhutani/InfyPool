import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import { Booking } from '../../interfaces/booking';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.page.html',
  styleUrls: ['./booked.page.scss'],
})
export class BookedPage implements OnInit {

  bookings: Booking[];

  constructor(private bookService : BookService) { }

  ngOnInit() {
    this.getUserBookings();
  }

  getUserBookings()
  {
    this.bookService.getUserBookings().subscribe((data : Booking[]) => 
    {this.bookings = data}
    );
  }

}
