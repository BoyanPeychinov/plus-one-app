import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlayer } from '../interfaces/player';

const apiUrl = environment.classesApiUrl

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  getPlayerById(playerId: string): Observable<IPlayer> {
    return this.http.get<IPlayer>(`${apiUrl}/EventPlayers/${playerId}`)
  }
  
  getPlayersByEvent$(eventId: string): Observable<IPlayer[]> {
    const params = new HttpParams().set('where', `{"eventId":"${eventId}"}`);

    return this.http.get<IPlayer[]>(`${apiUrl}/EventPlayers`, {params: params})
  }

  postPlayer$(body: IPlayer): Observable<IPlayer> {
    return this.http.post<IPlayer>(`${apiUrl}/EventPlayers`, body)
  }

  removePlayer$(playerId: string): {} {
    return this.http.delete(`${apiUrl}/EventPlayers/${playerId}`)
  }
}
