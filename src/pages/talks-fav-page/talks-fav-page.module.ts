import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TalksFavPage } from './talks-fav-page';

@NgModule({
  declarations: [
    TalksFavPage,
  ],
  imports: [
    IonicPageModule.forChild(TalksFavPage),
  ],
  exports: [
    TalksFavPage
  ]
})
export class TalksFavPageModule {}
