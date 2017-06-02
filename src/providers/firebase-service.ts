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
      // console.log(talks)
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
    return this.afd.list('/users/' + this.user.uid + '/stared', {
      query: {
        orderByChild: 'start'
      }
    }).map(staredTalks => {
      for (var i = 0; i < staredTalks.length; i++)
        staredTalks[i].stared = this.readTalk(staredTalks[i].talkKey);
      return staredTalks;
    });
  }

  updateStared(talkKey, talkStart) {
    this.afd.list('/users/' + this.user.uid + '/stared').push({
      'talkKey': talkKey,
      start: talkStart
    });
    // this.afd.list('/users/' + this.user.uid + '/stared', { preserveSnapshot: true }).subscribe(snapshots => {
    //   snapshots.forEach(snapshot => {
    //     // console.log(snapshot.key)
    //     console.log(snapshot.val().talkKey)
    //   });
    // })
    // console.log(talkKey, talkStart)

    // let a = this.afd.list('/users/' + this.user.uid + '/stared').$ref.once('value', snap => {
    //   console.log(snap)
    //   console.log(snap.val())
    //   console.log(snap.child('talkKey'))
    // })
    // console.log(a)
    // , {
    //   query: {
    //     orderByChild: 'talkKey',
    //     equalTo: talkKey
    //   }
    //   ,
    //   preserveSnapshot: true
  // }
  // ).$ref.equalTo(talkKey)
  //   .subscribe(snapshots => {
  //     console.log(snapshots)
  //     snapshots.forEach(snapshot => {
  //       console.log(snapshot.key)
  //       console.log(snapshot.val())
  //     });
  // })
    // .map(staredTalk => {
    //   console.log(staredTalk)
    // })
    // .$ref.on('child_added', snapshot => {
    //   console.log(snapshot)
    //   console.log(snapshot.val())
    //   for (var i = 0; i < snapshot.val().length; i++)
    //     console.log(snapshot.val()[i])
      // if (snapshot.val())
      //   console.log('remove')
      // else
      //   console.log('add')
      // if (snapshots.length == 0){
      //   console.log('add')
        // this.afd.list('/users/' + this.user.uid + '/stared').push({
        //   'talkKey': talkKey,
        //   start: talkStart
        // });
      // } else {
      //   snapshots.forEach(snapshot => {
      //   console.log('remove')
      //   this.afd.object('/users/' + this.user.uid + '/stared/' + snapshot.key).remove();
      // });
      // }
    // })
  }

  removeStared(staredKey) {
    console.log('/users/'+this.user.uid+'/stared/'+staredKey)
    this.afd.object('/users/'+this.user.uid+'/stared/'+staredKey).remove()
  }

}
