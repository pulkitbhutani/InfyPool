import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  NavController, NavParams, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-edit-pool',
  templateUrl: './edit-pool.page.html',
  styleUrls: ['./edit-pool.page.scss'],
})
export class EditPoolPage implements OnInit {

  rideId : string;
  
  constructor(private route: ActivatedRoute, private navCtrl : NavController) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('rideId'))
      {
        this.navCtrl.navigateBack('/rides/tabs/create');
        return;
      }
      this.rideId = paramMap.get('rideId');
    });
  }

}
