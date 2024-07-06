import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${environments.apiUrl}/events`;

  constructor(private http: HttpClient) { }

  getEvents(keyword?: string, date?: string): Observable<Event[]> {
    let params = new HttpParams();
    if (keyword) {
      params = params.set('keyword', keyword);
    }
    if (date) {
      params = params.set('date', date);
    }
    return this.http.get<Event[]>(this.apiUrl, { params });
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${event.id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  rsvpEvent(id: string, user: string): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/${id}/rsvp`, { user });
  }
}
