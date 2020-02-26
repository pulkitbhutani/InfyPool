import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import {UserService} from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {  NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @ViewChild('tabs', {static: true}) tabs: IonTabs

  userId : string;
  userDetailId: string;

  constructor(private userService : UserService, private afAuth: AngularFireAuth,private navCtrl : NavController) 
  { 
    this.userId =  this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.redirectToTabs();
  }

  redirectToTabs()
  {
    //checks if user has filled the userdetails and then only navigates to the tabs.
    this.userService.checkDetailsExist(this.userId).subscribe(res=> {
      this.userDetailId = res[0];
      
      if(this.userDetailId)
      {
        this.tabs.select('book');
      }
      else
      {
        this.navCtrl.navigateForward('/userdetails');
      }

    });
  }
}
