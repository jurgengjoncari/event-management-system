import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

const {apiUrl} = environment;

@Injectable({ providedIn: 'root' })
export class EventsService {

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<any[]>(`${apiUrl}/events`);
  }

  getEvent(id: string | null) {
    return this.http.get<any>(`${apiUrl}/events/${id}`);
  }

  createEvent(event: any) {
    return this.http.post(`${apiUrl}/events`, event);
  }

  updateEvent(id: string | null, event: any) {
    return this.http.put(`${apiUrl}/events/${id}`, event);
  }

  deleteEvent(id: string | null) {
    return this.http.delete(`${apiUrl}/events/${id}`);
  }

  registerForEvent(id: string | null) {
    return this.http.post(`${apiUrl}/events/${id}/register`, {});
  }

  unregisterFromEvent(id: string | null) {
    return this.http.delete(`${apiUrl}/events/${id}/unregister`, {});
  }
}
