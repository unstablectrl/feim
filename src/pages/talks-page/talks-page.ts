import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { FirebaseService } from './../../providers/firebase-service';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-talks-page',
  templateUrl: 'talks-page.html',
})
export class TalksPage {

  talks: Observable<any>;
  something: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public firebaseService: FirebaseService, public toastCtrl: ToastController) {
    this.talks = this.firebaseService.readTalks()
    // console.log(this.talks)
  }

  ionViewDidLoad() {}

  showTalk(talk) {
    this.navCtrl.push('TalkPage', {data: talk});
  }
  
  addTalkFav(talkKey, talkStart) {
    this.firebaseService.updateStared(talkKey, talkStart);
    let toast = this.toastCtrl.create({
      message: 'Talk was added successfully',
      duration: 2000,
      showCloseButton: true
    });
    toast.present();
  }
}
