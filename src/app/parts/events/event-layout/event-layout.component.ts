import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/core/interfaces/events';

@Component({
  selector: 'app-event-layout',
  templateUrl: './event-layout.component.html',
  styleUrls: ['./event-layout.component.css']
})
export class EventLayoutComponent implements OnInit {

  @Input() events: IEvent[];

  img_url: string = '../../../../assets/';

  constructor() { }

  ngOnInit(): void {
    this.img_url += this.randomNumber();
  }

  randomNumber(): string {
    let num: number = Math.floor(Math.random() * 10);

    return `card${num.toString()}.jpg`;
  }
}
