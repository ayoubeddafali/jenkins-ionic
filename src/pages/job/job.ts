import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Jenkins} from "../../providers/jenkins";


@Component({
  selector: 'page-job',
  templateUrl: 'job.html',
})
export class JobPage implements OnInit {
  job:any  = {};
  jobDetails = {};
  jobParameters = [];
  jobHealth = "health-80plus.png";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public jenkins: Jenkins) {
    this.job  = navParams.get("job");
  }

  ngOnInit(){
    let loader = this.loadingCtrl.create({
      content: "Fetching Job Details ",
    });
    loader.present().then( () => {
    this.jenkins.getJobDetails(this.job)
      .subscribe((data) => {
        console.log(data)
        this.jobDetails = data
        if (data.property[0]){
          this.jobParameters = data.property[0].parameterDefinitions ? data.property[0].parameterDefinitions : [] ;
        }
        if (data.healthReport[0] ){
          this.jobHealth = data.healthReport[0];
        }
        loader.dismiss();
      })
    });
    }

}
