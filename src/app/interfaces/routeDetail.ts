import * as firebase from 'firebase/app';


export interface RouteDetail {
    userId?: string;
    routeStops?: string[];
    createdAt?: firebase.firestore.Timestamp;
}