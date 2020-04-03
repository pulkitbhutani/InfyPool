//import { Timestamp } from 'rxjs';
import * as firebase from 'firebase/app';


export interface ChatRoom {
    rideId?: string;
    userId?: string[];
    createdAt?: firebase.firestore.Timestamp;
}