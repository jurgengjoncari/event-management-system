import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EventsService} from "../../../services/events";
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {jwtDecode} from "jwt-decode";


@Component({
  selector: 'app-event',
  imports: [
    DatePipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './event.html',
  styleUrls: ['./event.css'],
  standalone: true
})
export class Event implements OnInit {
  event: any = {};
  eventId: string | null = null;
  title: string = "New Event";
  userId: string | null = null;
  isCreator: boolean = false;
  isRegistered: boolean = false;

  constructor(private http: HttpClient,
              private router: Router,
              private eventsService: EventsService,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode(token);
      // @ts-ignore
      this.userId = decoded.userId;
    }
    if (this.eventId) {
      this.title = "Event Details";
      this.eventsService.getEvent(this.eventId).subscribe((event: any) => {
        console.log(event)
        this.event = event;
        this.isCreator = this.event.creator._id.toString() === this.userId?.toString();
        this.isRegistered = this.event.attendees.includes(this.userId);
        console.log('is registered: ', this.isRegistered, 'is creator: ', this.isCreator);
        this.cdr.detectChanges();
      })
    }
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    if (this.eventId) {
      this.eventsService.updateEvent(this.eventId, data).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/events']);
        },
        error: error => console.log(error)
      })
    }
    else {
      this.eventsService.createEvent(data).subscribe({
        next: (res: any) => {
          const {token} = res;
          localStorage.setItem('token', token)
          this.router.navigate(['/events'])
        },
        error: err => console.error('Error saving event', err)
      });
    }
  }

  onDelete() {
    this.eventsService.deleteEvent(this.eventId).subscribe({
      next: () => this.router.navigate(['/events']),
      error: err => console.error('Error deleting event', err)
    });
  }

  onRegister() {
    this.eventsService.registerForEvent(this.eventId).subscribe({
      next: () => this.router.navigate(['/events']),
      error: err => console.error('Error registering for event', err)
    })
  }

  onUnregister() {
    this.eventsService.unregisterFromEvent(this.eventId).subscribe({
      next: () => this.router.navigate(['/events']),
      error: err => console.error('Error unregistering from event', err)
    })
  }
}
