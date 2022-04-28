import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEvent, IEventPost } from 'src/app/core/interfaces/events';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-event-create-page',
  templateUrl: './event-create-page.component.html',
  styleUrls: ['./event-create-page.component.css']
})
export class EventCreatePageComponent implements OnInit {

  createFormGroup: FormGroup = this.formBuilder.group({
    "maxPeople": new FormControl(null, Validators.required),
    "start": new FormControl(null, [Validators.required]),
    "end": new FormControl(null, [Validators.required]),
    "venue": new FormControl(null, [Validators.required]),
    "rules": new FormControl(null, [Validators.required]),
    "day": new FormControl(null, [Validators.required])
  })

  constructor(
    private formBuilder: FormBuilder,
     private eventsService: EventsService,
     private router: Router,
     private location: Location) { }

  ngOnInit(): void {
  }

  handleCreate(): void {
    const {maxPeople, start, end, venue, rules, day} = this.createFormGroup.value;

    const body: IEventPost = {
      maxPeople: maxPeople,
      start: start,
      end: end,
      venue: venue,
      rules: rules,
      day: {
        "__type": "Date",
        "iso": day
      }
    }

    this.eventsService.postEvent$(body).subscribe(() => {
      this.router.navigate(['/events']);
    })

  }

  handleGoBack(): void {
    this.createFormGroup.reset;
    this.location.back()
  }

}
