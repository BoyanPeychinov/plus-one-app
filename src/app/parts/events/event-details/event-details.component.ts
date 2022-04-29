import { Location } from '@angular/common';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMainState } from 'src/app/+store';
import { IEvent } from 'src/app/core/interfaces/events';
import { IPlayer } from 'src/app/core/interfaces/player';
import { IUser } from 'src/app/core/interfaces/user';
import { EventsService } from 'src/app/core/services/events.service';
import { PlayersService } from 'src/app/core/services/players.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  players: IPlayer[];
  eventId: string;
  profileName: string;
  currentUser$: Observable<IUser> = this.store.select(mainState => mainState.currentUser)
  profileId: string;
  isPlayerAdded: boolean = false;
  show: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private playersService: PlayersService,
    private location: Location,
    private store: Store<IMainState>,
    private profileService: ProfileService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.eventId = params['eventId'];
      // console.log(this.eventId)
      this.eventsService.getEventById$(this.eventId).subscribe(event => {
        this.event = event;

        // console.log(this.event);
      });
    });
    this.playersService.getPlayers$().subscribe(players => {
      this.players = players;
    });


    this.currentUser$.subscribe(user => {
      this.profileId = user.profile
    })

    this.profileService.getProfile$(this.profileId)
      .subscribe(profile => this.profileName = profile.name);

  }

  handleNewPlayer(): void {
    const newPlayer: IPlayer = {
      name: this.profileName,
      eventId: this.eventId
    }

    this.playersService.postPlayer$(newPlayer).subscribe(() => {
      this.playersService.getPlayers$().subscribe(players => {
        this.players = players;
        this.router.navigate([`/events/${this.eventId}`]);
      });
    });
  }

  handleGoBack(): void {
    this.location.back();
  }
}
