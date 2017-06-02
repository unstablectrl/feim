import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseService } from './../../providers/firebase-service';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-talks-page',
  templateUrl: 'talks-page.html',
})
export class TalksPage {

  talks: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
    this.talks = this.firebaseService.readTalks();
  }

  ionViewDidLoad() {}

  showTalk(talk) {
    this.navCtrl.push('TalkPage', {data: talk});
  }
  
  addTalkFav(talkKey) {}

}
