//import { Timestamp } from 'rxjs';
import * as firebase from 'firebase/app';


export interface Booking {
    seats?: number;
    pickupDropPoint?: string;
    rideId?: string;
    userId?: string;
    poolDateTime?: firebase.firestore.Timestamp; //should come directly from ride table, as changes will not reflect.
    createdAt?: firebase.firestore.Timestamp;
}