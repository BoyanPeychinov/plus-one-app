import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';




@NgModule({
  declarations: [
    WelcomeComponent,
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,

  ],
  exports: [
    WelcomeComponent,
    NotFoundPageComponent
  ]
})
export class SharedModule { }
