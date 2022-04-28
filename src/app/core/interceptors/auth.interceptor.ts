import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.url.endsWith('login') || event.url.endsWith('users')) {
            const loggingUser: IUser = event.body;
            this.authService.handleLogin(loggingUser);
          } else if (event.url.endsWith('logout')) {
            this.authService.handleLogout();
          }
        }
      },
      ));
  }
}