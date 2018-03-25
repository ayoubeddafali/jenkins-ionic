import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobPage } from './job';

@NgModule({
  declarations: [
    JobPage,
  ],
  imports: [
    IonicPageModule.forChild(JobPage),
  ],
})
export class JobPageModule {}
