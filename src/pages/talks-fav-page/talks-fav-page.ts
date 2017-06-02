import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseService } from './../../providers/firebase-service';

@IonicPage()
@Component({
  selector: 'page-talks-fav-page',
  templateUrl: 'talks-fav-page.html',
})
export class TalksFavPage {
  talks;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
    this.firebaseService.authState.subscribe(user => {
      if (user) {
        this.talks = this.firebaseService.readStaredTalks();
      }
    });
  }

  ionViewDidLoad() {}

  showTalk(talk) {
    this.navCtrl.push('TalkFavPage', {data: talk});
  }

  removeTalkFav(talkKey) {
    console.log(talkKey)
  }

}
