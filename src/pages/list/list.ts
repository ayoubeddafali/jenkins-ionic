import {Component, OnInit} from '@angular/core';
import { NavController, NavParams, AlertController, Item, ToastController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Jenkins } from '../../providers/jenkins';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {

  public servers: Observable<any>;
  public serversLists;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController,
              public afd: AngularFireDatabase,
              private jenkins: Jenkins) {
      this.servers = afd.list('/servers').valueChanges();
      this.serversLists = this.servers;
      this.serversLists.subscribe();
  }

  getBackground(server){
    if (server.state == "actif"){
      return "green";
    }
  }
  addJenkinsServer(data){
    // add server to firebase
    const newServer = this.afd.list('/servers').push({})
    newServer.set({
      id: newServer.key,
      name: data.name,
      url: data.url,
      username: data.username,
      password: data.password
    })
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
            this.addJenkinsServer(data)
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(server){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose an option',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          cssClass: "danger",
          icon: 'trash',
          handler: () => {
            this.deleteServer(server)
          }
        },{
          text: 'Update',
          icon: 'cog',
          handler: () => {
            this.showServerInfo(server)
          }
        },
        {
          text: 'Activate',
          icon: 'checkmark',
          handler: () => {
            this.activateServer(server)
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  activateServer(server){
    server.state = "actif";
    this.jenkins.updateCredentials(server);
  }
  showServerInfo(server){
    let prompt = this.alertCtrl.create({
      title: 'Update Jenkins Server',
      message: "Enter Credentials",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: server.name
        },
        {
          name: 'url',
          placeholder: 'Url',
          value: server.url
        },
        {
          name: 'username',
          placeholder: 'Username',
          value: server.username
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          value: server.password
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log(data);

          }
        },

        {
          text: 'Update',
          handler: data => {
            console.log(data);
            this.updateServer(data, server.id)
          }
        }
      ]
    });
    prompt.present();
  }

  deleteServer(server){
    this.afd.list('/servers').remove(server.id)
  }

  updateServer(server, id){
    this.afd.list('/servers').update(id, {
      name: server.name,
      url: server.url,
      username: server.username,
      password: server.password
    })
  }


  ngOnInit() {
  }

}
