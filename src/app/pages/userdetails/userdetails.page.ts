import { Component, OnInit } from '@angular/core';
import {UserDetail} from '../../interfaces/userDetail';
import {Vehicle} from '../../interfaces/vehicle';
import {RouteDetail} from '../../interfaces/routeDetail';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {UserService} from '../../services/user.service';
import {  NavController, NavParams } from '@ionic/angular';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.page.html',
  styleUrls: ['./userdetails.page.scss'],
})
export class UserdetailsPage implements OnInit {

  carOwner: boolean = false;
  firstName : string;
  lastName: string;
  mobileNumber: string;
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



  constructor(private db: AngularFirestore, private userService : UserService,public alertController: AlertController, private navCtrl : NavController) {
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


  async addUserDetails()
  {
    //user info which is to be updated.
    this.userInfo.firstName = this.firstName;
    this.userInfo.lastName = this.lastName;
    this.userInfo.mobileNumber = this.mobileNumber;
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

    const alert = await this.alertController.create({
      header: 'Thanks For Sharing Your Details',
      //subHeader: 'Incorrect Credentials',
      message: 'You can start using the app now',
      buttons: [{
        text :'OK',
      handler: () => {
        this.navCtrl.navigateForward('/tabs/book');
      }
      }]
      
    });
    await alert.present();


  }


}
