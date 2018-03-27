import {Http , Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import Rx from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class Jenkins {
    username = `ayoub`;
    password = "19641995";
    baseUrl = `http://localhost:8100`;
    jenkinsCrumb = [];

  constructor(public http: Http){
    console.log("JenkinsServiceConstructore") ;
  }


  getJenkinsCrumb(){
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    return this.http.get(`${this.baseUrl}//crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)`, {headers: headers})
            .map(res => res);
    }

  runJob(job){
    console.log("Running Job")
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    this.getJenkinsCrumb()
      .subscribe((data) => {
        let header = data._body.split(":")
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
       console.log(data._body)
       this.jenkinsCrumb = data._body.split(":")
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

  getServers(){

  }
}
