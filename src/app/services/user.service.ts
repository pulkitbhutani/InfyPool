import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserDetail} from '../interfaces/userDetail';
import {Vehicle} from '../interfaces/vehicle';
import {RouteDetail} from '../interfaces/routeDetail';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})

export class UserService {

    userId : string;
    id: string;
    private usercollection = this.afs.collection<UserDetail>('users');

    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    }
    
    ngOnInit(){
      
    }

    addUserDetails(user : UserDetail)
    {
        this.userId =  this.afAuth.auth.currentUser.uid;
        user.userId = this.userId;
        user.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
        user.officeCampus = 'Infosys Jaipur';
        this.usercollection.add(user);
    }

    addVehicleandRouteDetails(vehicle: Vehicle, routeInfo: RouteDetail)
    {
        vehicle.userId = this.userId;
        vehicle.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
        this.afs.collection<Vehicle>('vehicles').add(vehicle);

        routeInfo.userId = this.userId;
        routeInfo.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
        this.afs.collection<RouteDetail>('routeInfo').add(routeInfo);
    }

    checkDetailsExist(user : string)
    {
        return this.afs.collection('users', ref=> ref.where('userId','==',user)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              //const data = a.payload.doc.data() as UserDetail;
              return a.payload.doc.id;
            }))
          );
    }

    getCurrentUserStartPoint()
    {
      this.userId =  this.afAuth.auth.currentUser.uid;

      return this.afs.collection("users", ref=> ref.where('userId','==',this.userId)).valueChanges();
    }

    

       
}