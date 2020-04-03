//import { Timestamp } from 'rxjs';
import * as firebase from 'firebase/app';


export interface UserDetail {
    userId?: string;
    firstName?: string;
    lastName?: string;
    mobileNumber?: string;
    empoyeeId?: string;
    carOwner?:boolean;
    startPoint?: string;
    officeCampus?: string;
    createdAt?: firebase.firestore.Timestamp;
}