import * as firebase from 'firebase/app';


export interface VehicleDetail {
    userId?: string;
    routeStops?: string;
    createdAt?: firebase.firestore.Timestamp;
}