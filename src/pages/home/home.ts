import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation';

import { DsProvider } from '../../providers/ds/ds';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  text;
  topic: string = 'driver/thisisdriverid';
  chatArray = [];
  chats;
  record;

  constructor(
    public navCtrl: NavController,
    private ds: DsProvider,
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    this.ds.login(this.loginHandler);
    this.backgroundMode.configure({hidden: true, silent: true});
    this.backgroundMode.enable();
    this.backgroundMode.overrideBackButton();

    this.record = this.ds.getRecord(this.topic);
    this.record.subscribe('status', data => {
      console.log(data);
      this.chatArray.push(data);

      if(data.input === "job_created") {
        // this.localNotifications.schedule({
        //   id: 1,
        //   text: 'Single ILocalNotification',
        //   data: { order_id: "tsetsetset" }
        // });

        this.backgroundMode.moveToForeground();
        this.backgroundMode.isScreenOff()
          .then(isOff => {
            if(isOff){
              // this.backgroundMode.unlock();
              this.backgroundMode.wakeUp();
              
            }
          })

      }

    });

    let watch = this.geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: Infinity
    });

    watch.subscribe((data) => {
      console.log(data);
    });

    // const defaultUsername = 'anonymous';
    // const username = window.prompt('Please enter your name', defaultUsername);
    // this.username = username || defaultUsername;
    //
    // this.ds.login(null, this.loginHandler);
    //
    // this.chats = this.ds.getList('chats');
    //
    // this.chats.on('entry-added', recordName => {
    //   this.ds.getRecord(recordName).whenReady(record => {
    //     record.subscribe((data) => {
    //       console.log(data);
    //       this.chatArray.unshift(data);
    //     }, true);
    //   });
    // });

    
  }

  addChat() {
    this.record.set('status', { input: this.text });
    this.text = '';
    // const recordName = 'chat/' + this.ds.dsInstance.getUid();
    // const chatRecord = this.ds.getRecord(recordName);
    // chatRecord.set({ username: this.username, text: this.text });
    // this.chats.addEntry(recordName);
  }

  loginHandler(success, data) {
    console.log('logged in', success, data);
  }

  update(a) {
    console.log(a);
  }
}