import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Jenkins} from "../../providers/jenkins";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public jenkins: Jenkins) {
  }

  addServer(): void {
    let prompt = this.alertCtrl.create({
      title: 'Add Jenkins Server',
      message: "Enter Credentials",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'url',
          placeholder: 'Url'
        },
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            this.jenkins.addServer(data)
          }
        }
      ]
    });
    prompt.present();
  }

  ngOnInit() {

  }

}
