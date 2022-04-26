import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsPageComponent } from './events-page/events-page.component';
import { EventLayoutComponent } from './event-layout/event-layout.component';
import { EventsRoutingModule } from './events-routing.module';
import { EventCreatePageComponent } from './event-create-page/event-create-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    EventsPageComponent,
    EventLayoutComponent,
    EventCreatePageComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    CoreModule,
  ]
})
export class EventsModule { }
