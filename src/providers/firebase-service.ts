import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
// import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

  constructor(public afAuth: AngularFireAuth, public afd: AngularFireDatabase) {
  }

  readTalks() {
    return this.afd.list('/talks', {
      query: {
        orderByChild: 'start'
      }
    }).map(talks => {
        return talks.map(oneTalk => {
          oneTalk.theme = this.afd.object('/themes/' + oneTalk.theme);
          for (var i = 0; i < oneTalk.authors.length; i++)
            oneTalk.authors[i] = this.afd.object('/people/' + oneTalk.authors[i]);
          return oneTalk;
        });
      });
  }

}
