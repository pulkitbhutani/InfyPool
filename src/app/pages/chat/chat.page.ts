import { Component, OnInit, ViewChild } from '@angular/core';
import {  NavController, NavParams, IonContent } from '@ionic/angular';
import { PoolChatMessage } from '../../interfaces/poolChatMessage';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

//import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message: string;
  rideId : string;
  userId : string;
  createdAt = new Date();
  chatMessage : PoolChatMessage;
  poolchatMessages : PoolChatMessage[];

  @ViewChild(IonContent) content : IonContent

  constructor(private route: ActivatedRoute, private router : Router,private afs : AngularFirestore, private afAuth :AngularFireAuth) {
    this.chatMessage = {};
   if(this.router.getCurrentNavigation().extras.state){
     this.rideId = this.router.getCurrentNavigation().extras.state.rideId;
   }

   this.userId =  this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages()
  {
    this.afs.collection('poolchat',ref => ref.where('rideId' ,'==', this.rideId).orderBy('createdAt')).valueChanges().subscribe((messages: PoolChatMessage[]) =>{
      this.poolchatMessages = messages;
    });
  //to be worked on and made effecient, try using then so scoll happens after data load.  
    setTimeout(()=>{
      this.content.scrollToBottom(10);
     },200);
  }

  sendMessage() {
   this.chatMessage.createdAt = firebase.firestore.Timestamp.fromDate(this.createdAt);
   this.chatMessage.message = this.message;
   this.chatMessage.rideId = this.rideId;
   this.chatMessage.userId = this.userId;
   
   this.afs.collection<PoolChatMessage>('poolchat').add(this.chatMessage);
   this.loadMessages();
   this.message = '';

   setTimeout(()=>{
    this.content.scrollToBottom(200);
   },50);
   
  }

}
