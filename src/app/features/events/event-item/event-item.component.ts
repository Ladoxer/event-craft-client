import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../core/models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css',
})
export class EventItemComponent implements OnInit {
  @Input() event!: Event;
  @Output() deleteEmitter = new EventEmitter<string>();

  isOrganiser: boolean = false;
  isAttending: boolean = false;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('userData') === this.event.organizer) {
      this.isOrganiser = true;
    }

    this.isAttending = this.event.attendees?.some((attendee) => attendee === localStorage.getItem('userData')) ?? false;
  }

  deleteEvent(): void {
    this.eventService.deleteEvent(this.event.id as string).subscribe({
      next: () => {
        this.deleteEmitter.emit(this.event.id as string);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  rsvpEvent(): void {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userData');
    if (token && userId) {
      this.eventService.rsvpEvent(this.event.id as string, userId as string).subscribe({
        next: (event) => {
          // Handle RSVP logic, e.g., update the event object
          this.event.attendees?.push(userId as string);
          this.isAttending = true;
          this.event = event;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }else{
      this.router.navigate(['/login']);
    }
  }


}
