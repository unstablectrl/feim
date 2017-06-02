import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {
  authState: Observable<firebase.User>;
  user: firebase.User;

  constructor(public afAuth: AngularFireAuth, public afd: AngularFireDatabase) {
    this.authState = afAuth.authState;
    this.afAuth.auth.signInAnonymously().then(user => this.user = user)
  }

  readTalks() {
    return this.afd.list('/talks', {
      query: {
        orderByChild: 'start'
      }
    }).map(talks => {
      console.log(talks)
      return talks.map(oneTalk => {
        oneTalk.theme = this.afd.object('/themes/' + oneTalk.theme);
        for (var i = 0; i < oneTalk.authors.length; i++)
          oneTalk.authors[i] = this.afd.object('/people/' + oneTalk.authors[i]);
        // console.log(oneTalk)
        return oneTalk;
      });
    });
  }
  
  readTalk(key) {
    return this.afd.object('/talks/' + key).map(oneTalk => {
        oneTalk.theme = this.afd.object('/themes/' + oneTalk.theme);
        for (var i = 0; i < oneTalk.authors.length; i++)
          oneTalk.authors[i] = this.afd.object('/people/' + oneTalk.authors[i]);
        // console.log(oneTalk)
        return oneTalk;
      })
  }

  readStaredTalks() {
    return this.afd.list('/users/' + this.user.uid + '/stared').map(staredTalks => {
      for (var i = 0; i < staredTalks.length; i++)
        staredTalks[i].stared = this.readTalk(staredTalks[i].$value);
      return staredTalks;
    });
  }

  updateStared(talkKey) {
    this.afd.list('/users/' + this.user.uid + '/stared').push(talkKey);
  }

}
