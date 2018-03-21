import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';

@Injectable()
export class Jenkins {
    token = `2ffd011a1070fe12c29a722fb70a48c4`;
    username = `ayoub`;
    password = "19641995"; 
    baseUrl = `/api`;
    
    constructor(public http: Http){ console.log("JenkinsServiceConstructore") ; }

    getAllJobs(){
        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password)); 
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        return this.http.get(this.baseUrl, {headers: headers})
            .map(res => res.json())

    }
}
