import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TalksPage } from './talks-page';

@NgModule({
  declarations: [
    TalksPage,
  ],
  imports: [
    IonicPageModule.forChild(TalksPage),
  ],
  exports: [
    TalksPage
  ]
})
export class TalksPageModule {}
