import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../services/events";
import {CommonModule, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-events',
  imports: [
    DatePipe,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './events.html',
  styleUrls: ['./events.css'],
  standalone: true
})
export class Events implements OnInit {
  $events!: Observable<any>;
  events: any[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.$events = this.eventsService.getEvents();
    // this.eventsService.getEvents().subscribe((events) => {
    //   console.log(events);
    //   this.events = events;
    // })
  }
}
