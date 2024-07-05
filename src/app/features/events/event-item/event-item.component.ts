import { Component, Input } from '@angular/core';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../core/models/event.model';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css',
})
export class EventItemComponent {
  @Input() event!: Event;

  constructor(private eventService: EventService) {}

  deleteEvent(): void {
    this.eventService.deleteEvent(this.event.id).subscribe({
      next: () => {
        // Handle deletion logic, e.g., refreshing the event list
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  rsvpEvent(): void {
    this.eventService.rsvpEvent(this.event.id, 'user').subscribe({
      next: (event) => {
        // Handle RSVP logic, e.g., update the event object
        this.event = event;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  
}
