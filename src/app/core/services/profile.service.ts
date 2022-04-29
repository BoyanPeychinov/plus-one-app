import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProfile } from '../interfaces/profile';

const apiUrl = environment.classesApiUrl


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  postProfile$(body: IProfile): Observable<IProfile> {
    return this.http.post<IProfile>(`${apiUrl}/Profile`, body)
  }

  getProfile$(profileId: string):Observable<IProfile> {
    return this.http.get<IProfile>(`${apiUrl}/Profile/${profileId}`)
  }

  editProfile$(body, profileId): Observable<{}> {
    return this.http.put(`${apiUrl}/Profile/${profileId}`, body)
  }
}
