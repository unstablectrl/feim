import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@Component({
  selector: 'page-talks-tabs',
  templateUrl: 'talks-tabs.html'
})
@IonicPage()
export class TalksTabs {

  tab1Root: any = 'TalksPage';
  tab2Root: any = 'TalksFavPage';

  constructor(public navCtrl: NavController) {}

}
