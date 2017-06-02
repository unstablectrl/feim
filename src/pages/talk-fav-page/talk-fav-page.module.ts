import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TalkFavPage } from './talk-fav-page';

@NgModule({
  declarations: [
    TalkFavPage,
  ],
  imports: [
    IonicPageModule.forChild(TalkFavPage),
  ],
  exports: [
    TalkFavPage
  ]
})
export class TalkFavPageModule {}
