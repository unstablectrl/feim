import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-talk-fav-page',
  templateUrl: 'talk-fav-page.html',
})
export class TalkFavPage {
  talk: object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.talk = navParams.get('data');
  }

  ionViewDidLoad() {}

}
