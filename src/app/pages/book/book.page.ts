import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  
  rides: Observable<any[]>;
  constructor(db: AngularFirestore) { 
    this.rides = db.collection('rides').valueChanges();
}

  ngOnInit() {
  }

}
