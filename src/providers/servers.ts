import {Http , Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import Rx from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class Servers {
  baseurl = "https://<application>.firebaseio.com/servers.json"
  servers: AngularFireList<any>;
  constructor(public http: Http, afd: AngularFireDatabase){
    console.log("Servers Constructor") ;
    this.servers = afd.list('/servers');
  }
  getServers(){
    return this.servers;
  }
  addServer(data){
    // add server to firebase
    const newServer = this.servers.push({})
    newServer.set({
      id: newServer.key,
      name: data.name,
      url: data.url,
      username: data.username,
      password: data.password
    })
    console.log(this.servers)
  }

}
