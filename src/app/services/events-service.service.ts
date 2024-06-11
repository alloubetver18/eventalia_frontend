import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventsServiceService {
  constructor(private _http: HttpClient) {}

  getEventList(): Observable<any> {
    return this._http.get('http://localhost:8000/event/list');
  }

  getEventById(id: number, email: string): Observable<any> {
    return this._http.get(
      'http://localhost:8000/event/data/' + id + '/' + email
    );
  }

  createEvent(event: any): Observable<any> {
    return this._http.post('http://localhost:8000/event/add', event);
  }

  getEventsCreatedBy(email: string) {
    return this._http.get('http://localhost:8000/event/createdby/' + email);
  }

  followEvent(email: string, eventId: number) {
    return this._http.post('http://localhost:8000/event/follow', {
      email: email,
      eventId: eventId,
    });
  }
}
