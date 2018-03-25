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
  jobHealth = "";
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
        // console.log(data)
        this.jobDetails = data
        this.jobParameters = data.property[0].parameterDefinitions;
        this.jobHealth = data.healthReport[0].iconUrl;
        loader.dismiss();
      })
    });
    }

}
