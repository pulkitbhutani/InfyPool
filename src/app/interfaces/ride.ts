//import { Timestamp } from 'rxjs';
import * as firebase from 'firebase/app';



export interface Ride {
    //id?: string;
    destination?: string;
    datetime?: firebase.firestore.Timestamp;//(seconds: number,nanoseconds: number);
    createdAt?: firebase.firestore.Timestamp;
    locations?: string[];
    price?: number;
    seats?: number;
    toOffice?: boolean;
    userId?: string;
}