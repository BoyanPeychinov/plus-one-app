import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/core/interfaces/events';
import { EventsService } from 'src/app/core/services/events.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {

  events?: IEvent[];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.eventsService.getEvents$()
    .subscribe(events => {
      this.events = events;
    });
  }

}
