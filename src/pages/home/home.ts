import { Component, OnInit} from '@angular/core';
import { NavController,  LoadingController } from 'ionic-angular';
import { Jenkins } from '../../providers/jenkins';
import {JobPage} from "../job/job";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  jobs = []

  constructor(public navCtrl: NavController,
              private jenkins: Jenkins,
              private loadingCtrl:LoadingController) {}

  showJob(job): void{
      this.navCtrl.push(JobPage, {job: job})
  }
  ngOnInit(){
    let loader = this.loadingCtrl.create({
          content: "Fetching Data ",
        });
    loader.present().then( () => {
        this.jenkins.getAllJobs()
            .subscribe((data) => {
                console.log("job 0")
                console.log(data.jobs[0])
                this.jobs = data.jobs
                loader.dismiss();
        })

    });
  }

}
