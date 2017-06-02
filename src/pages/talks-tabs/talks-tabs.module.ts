import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TalksTabs } from './talks-tabs';

@NgModule({
  declarations: [
    TalksTabs,
  ],
  imports: [
    IonicPageModule.forChild(TalksTabs),
  ]
})
export class TalksTabsModule {}
