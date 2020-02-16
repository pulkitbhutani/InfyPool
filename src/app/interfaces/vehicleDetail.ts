import * as firebase from 'firebase/app';


export interface VehicleDetail {
    userId?: string;
    carModel?: string;
    carColor?: string;
    carNumber?: string;
    createdAt?: firebase.firestore.Timestamp;
}