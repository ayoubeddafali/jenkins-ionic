import { Component, OnInit} from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
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
              private loadingCtrl:LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {}

  showJob(job): void{
      this.navCtrl.push(JobPage, {job: job})
  }
  runJob(job) :void{
    let toast = this.toastCtrl.create({
      message: 'Job is set to run',
      duration: 3000,
      position: 'bottom'
    });
    this.jenkins.runJob(job)
    toast.present();
    
  } 
  addJob(): void {
    let prompt = this.alertCtrl.create({
      title: 'Add Jenkins Job',
      message: "Enter Details",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'url',
          placeholder: 'Url'
        },
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            this.jenkins.addServer(data)
          }
        }
      ]
    });
    prompt.present();
  }
  deleteJob(job): void{
    let toast = this.toastCtrl.create({
      message: 'Are u sure ?',
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: "Delete"
    });
    toast.present();
    toast.onDidDismiss(() => {
      let loader = this.loadingCtrl.create({
        content: "Deleting Job",
      });
      loader.present().then( () => {
        this.jenkins.deleteJob(job).subscribe((data) => {
          this.getJobs() 
        })
        loader.dismiss();
    });

    });

  }
  updateView(){
    this.jenkins.getUpdates()
    .subscribe((data) => {
        console.log("job 0")
        console.log(data.jobs[0])
        this.jobs = data.jobs 
      })
  }
  getJobs(){
    this.jenkins.getAllJobs()
      .subscribe((data) => {
          console.log("job 0")
          console.log(data.jobs[0])
          this.jobs = data.jobs 
        })
  }

  ngOnInit(){
    let loader = this.loadingCtrl.create({
          content: "Fetching Data ",
        });
    loader.present().then( () => {
      this.getJobs()
      loader.dismiss();
    });
    this.updateView();
  }

}
