//import { Timestamp } from 'rxjs';
import * as firebase from 'firebase/app';


export interface PoolChatMessage {
    rideId?: string;
    //chatRoomId?:string;
    userId?: string;
    //type?:string;
    message?:string;
    createdAt?: firebase.firestore.Timestamp;
}