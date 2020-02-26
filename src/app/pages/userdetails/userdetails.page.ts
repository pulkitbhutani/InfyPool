import { Component, OnInit } from '@angular/core';
import {UserDetail} from '../../interfaces/userDetail';
import {Vehicle} from '../../interfaces/vehicle';
import {RouteDetail} from '../../interfaces/routeDetail';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.page.html',
  styleUrls: ['./userdetails.page.scss'],
})
export class UserdetailsPage implements OnInit {

  carOwner: boolean = false;
  firstName : string;
  lastName: string;
  employeeId: string;
  officeCampus : string;
  usualStartPoint: string;

  carNumber : string;
  carModel : string;
  carColor : string;

  routeStops : string[];

  points: Observable<any[]>;
  vehicle : Vehicle;
  userInfo : UserDetail;
  routeInfo : RouteDetail;



  constructor(private db: AngularFirestore, private userService : UserService) {
    this.points = db.collection('pickupdroppoints').valueChanges();
    this.userInfo = {};
    this.vehicle = {};
    this.routeInfo = {};
   }

  ngOnInit() {
    
  }

  carOwnerToggle()
  {
    this.carOwner = !this.carOwner;
    this.points = this.db.collection('pickupdroppoints').valueChanges();
  }


  addUserDetails()
  {
    //user info which is to be updated.
    this.userInfo.firstName = this.firstName;
    this.userInfo.lastName = this.lastName;
    this.userInfo.empoyeeId = this.employeeId;
    this.userInfo.carOwner = this.carOwner;
    this.userInfo.officeCampus = this.officeCampus;
    this.userInfo.startPoint = this.usualStartPoint;

    
    this.userService.addUserDetails(this.userInfo);

    if(this.carOwner == true)
    {
      //vehicle details that needs to be updated
      this.vehicle.carModel = this.carModel;
      this.vehicle.carColor = this.carColor;
      this.vehicle.carNumber = this.carNumber;

      //regular route which user will set.
      this.routeInfo.routeStops = this.routeStops;

      this.userService.addVehicleandRouteDetails(this.vehicle,this.routeInfo);
    }

  }


}
