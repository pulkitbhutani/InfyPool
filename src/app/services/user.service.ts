import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {AuthService} from './auth.service'
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
    userName : string;
    private usercollection = this.afs.collection<UserDetail>('users');

    constructor(private afs: AngularFirestore, private authService : AuthService) {
    }
    
    ngOnInit(){
      
    }

    getUserName(userIdUid : string){
      
      return this.afs.collection('users',ref => ref.where('userId' ,'==', userIdUid)).valueChanges();
    }

    addUserDetails(user : UserDetail)
    {
        //this.usercollection.add(user);
        return this.afs.collection('users').doc(this.authService.userId).set({
        userId :  this.authService.userId,
        firstName : user.firstName,
        lastName : user.lastName,
        mobileNumber : user.mobileNumber,
        carOwner : user.carOwner,
        employeeId : user.empoyeeId,
        startPoint : user.startPoint,
        createdAt : firebase.firestore.Timestamp.fromDate(new Date()),
        officeCampus : 'Infosys Jaipur'
        });
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
        console.log(user);
        return this.usercollection.doc(user).valueChanges().pipe(take(1));
    }

    getCurrentUserStartPoint()
    {
      this.userId =  this.authService.userId;

      return this.afs.collection("users", ref=> ref.where('userId','==',this.userId)).valueChanges();


    }

    

       
}