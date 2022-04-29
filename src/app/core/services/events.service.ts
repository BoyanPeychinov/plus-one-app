import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IEvent, IEventPost } from '../interfaces/events';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiHeaders } from 'src/assets/api-headers';


const apiUrl = environment.classesApiUrl
const httpOptions = {
  headers: new HttpHeaders({
    "X-Parse-Application-Id": apiHeaders.apiId,
    "X-Parse-REST-API-Key": apiHeaders.apiKey,
    "content-type": "application/json",
  })
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents$(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${apiUrl}/FootballEvent`, httpOptions)
  }

  getEventById$(eventId: string): Observable<IEvent> {
    return this.http.get<IEvent>(`${apiUrl}/FootballEvent/${eventId}`, httpOptions)
  }

  postEvent$(body: IEventPost ): Observable<IEvent> {
    return this.http.post<IEvent>(`${apiUrl}/FootballEvent`, body, httpOptions)
  }
}
