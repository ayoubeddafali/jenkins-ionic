import {Http , Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import Rx from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class Jenkins {
    token = `2ffd011a1070fe12c29a722fb70a48c4`;
    username = `ayoub`;
    password = "19641995";
    baseUrl = `http://localhost:8100`;
    jenkinsCrumb = [];

  constructor(public http: Http, private sqlite: SQLite){
    console.log("JenkinsServiceConstructore") ;
    this.initDB()
  }


  getJenkinsCrumb(){
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    return this.http.get(`${this.baseUrl}//crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)`, {headers: headers})
            .map(res => res._body);
    }
  
  runJob(job){
    console.log("Running Job")
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    this.getJenkinsCrumb()
      .subscribe((data) => {
        let header = data.split(":")
        console.log(header)
        let new_headers = new Headers();
        new_headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
        new_headers.append(header[0].toString(), header[1].toString())
        this.http.post(`${this.baseUrl}/job/${job.name}/build`, {} , {headers: new_headers})
                  .subscribe((data) => {
                  })
      })
  } 


  getAllJobs(){
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    this.getJenkinsCrumb().subscribe((data) => {
       this.jenkinsCrumb = data.split(":")
    } )
    return this.http.get(`${this.baseUrl}/api/json`, {headers: headers})
            .map(res => res.json());
  }
  getUpdates(){
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    // return this.http.get(`${this.baseUrl}/api/json`, {headers: headers})class="hamid"
    //         .map(res => res.json());
    return Observable.interval(10000)
               .mergeMapTo(this.http.get(`${this.baseUrl}/api/json`, {headers: headers})
               .map((res) => res.json()));  
    }

  getJobDetails(job){
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    return this.http.get(`${this.baseUrl}/job/${job.name}/api/json`, {headers: headers})
             .map(res => res.json());
    }

  deleteJob(job){
    console.log("Deleting Job")
    console.log(`${this.baseUrl}/job/${job.name}/doDelete`)
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    headers.append(this.jenkinsCrumb[0].toString(), this.jenkinsCrumb[1].toString())
    return this.http.post(`${this.baseUrl}/job/${job.name}/doDelete`, {} , {headers: headers})
    
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
