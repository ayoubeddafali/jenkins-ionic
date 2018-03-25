import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class Jenkins {
    token = `2ffd011a1070fe12c29a722fb70a48c4`;
    username = `ayoub`;
    password = "19641995";
    baseUrl = `http://localhost:8100`;

  constructor(public http: Http, private sqlite: SQLite){
    console.log("JenkinsServiceConstructore") ;
    this.initDB()
  }

  getAllJobs(){
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    return this.http.get(`${this.baseUrl}/api/json`, {headers: headers})
            .map(res => res.json())
    }

  getJobDetails(job){
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    return this.http.get(`${this.baseUrl}/job/${job.name}/api/json`, {headers: headers})
             .map(res => res.json())
    }

  initDB(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table servers(name VARCHAR(32), url VARCHAR(32), ' +
          'username VARCHAR(32), ' +
          'password VARCHAR(32))', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
  addServer(data){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("INSERT INTO servers VALUES (data.name, data.url, data.username, data.password) ", {})
      })
      .catch(e => console.log(e))
  }
  getServers(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log("DB")
        console.log(db)
      })
  }
}
