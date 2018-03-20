import { Component, OnInit} from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Jenkins } from '../../providers/jenkins';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {
  jobs:any = []
  constructor(public navCtrl: NavController,
              private jenkins: Jenkins,
              private loadingCtrl:LoadingController) {}

  ngOnInit(){
    let loader = this.loadingCtrl.create({
          content: "Fetching Data ",
        });
    loader.present().then( () => {
        this.jenkins.getAllJobs()
            .subscribe((data) => {
                console.log(data)
              // this.jobs = response
                loader.dismiss();
              // console.log(this.jobs)
        })

    });
  }

}
