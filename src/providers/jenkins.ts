import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';

@Injectable()
export class Jenkins {
    Token = `2ffd011a1070fe12c29a722fb70a48c4`;
    ID = `ayoub`;
    baseUrl = `http://ayoub:2ffd011a1070fe12c29a722fb70a48c4@172.16.88.143:8080/api/json`;
    constructor(public http: Http){ console.log("JenkinsServiceConstructore") ; }

    getAllJobs(){
        return this.http.get(this.baseUrl)
            .map(res => res.json())

    }
}
