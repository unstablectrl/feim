import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-talk-page',
  templateUrl: 'talk-page.html',
})
export class TalkPage {
  talk: object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.talk = navParams.get('data');
  }

  ionViewDidLoad() {}

}
