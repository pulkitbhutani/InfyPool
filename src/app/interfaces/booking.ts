//import { Timestamp } from 'rxjs';
import * as firebase from 'firebase/app';


export interface Booking {
    seats?: number;
    pickupDropPoint?: string;
    rideId?: string;
    userId?: string;
    createdAt?: firebase.firestore.Timestamp;
}