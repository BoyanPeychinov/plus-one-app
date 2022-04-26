import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';




@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,

  ],
  exports: [
    WelcomeComponent
  ]
})
export class SharedModule { }
