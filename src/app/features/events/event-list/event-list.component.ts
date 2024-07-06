import { Component, OnInit } from '@angular/core';
import { Event } from '../../../core/models/event.model';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  keyword: string = '';
  date: string = '';
  loading: boolean = false;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getEvents(this.keyword, this.date).subscribe({
      next: (events) => {
        this.events = events;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    })
  }

  deleteEvent(id: string): void {
    this.events = this.events.filter((event) => event.id !== id);
  }

  onSearch(): void {
    this.loadEvents();
  }
}
