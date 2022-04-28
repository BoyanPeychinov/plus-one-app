import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { IMainState, login, logout } from 'src/app/+store';
import { apiHeaders } from 'src/assets/api-headers';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user';

// const httpOptions = {
//   headers: new HttpHeaders({
//     "X-Parse-Application-Id": apiHeaders.apiId,
//     "X-Parse-REST-API-Key": apiHeaders.apiKey,
//     "X-Parse-Revocable-Session": "1",
//     "content-type": "application/json",
//     // "X-Parse-Session-Token": Store.currentUser
//   })
// }


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUser$ = this.store.select(mainState => mainState.currentUser);
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));


  constructor(private http: HttpClient, private store: Store<IMainState>) { }

  register$(body: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.usersApiUrl}`, body)
  }

  login$(body: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.loginApiUrl}`, body)
      .pipe(
        tap(response => localStorage.setItem('sessionToken', response.sessionToken)),
      )
  }

  logout$(): Observable<void> {
    return this.http
      .post<void>(`${environment.logoutApiUrl}`, {})
  }

  authenticate(): Observable<IUser> {
    return this.http
      .get<IUser>(`${environment.usersApiUrl}/me`)
      .pipe(
        tap(user => this.handleLogin(user)), catchError((err) => {
        return EMPTY;
      }))
  }

  // handleLogin(newUser: IUser) {
  //   this._currentUser.next(newUser);
  // }
  handleLogin(newUser: IUser) {
    this.store.dispatch(login({user: newUser}));
  }

  // handleLogout() {
  //   this._currentUser.next(undefined);
  // }
  handleLogout() {
    this.store.dispatch(logout());
  }

}