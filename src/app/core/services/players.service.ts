import { HttpClient } from '@angular/common/http';
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

  getPlayers$(): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(`${apiUrl}/EventPlayers`)
  }

  postPlayer$(body: IPlayer ): Observable<IPlayer> {
    return this.http.post<IPlayer>(`${apiUrl}/EventPlayers`, body)
  }
}
