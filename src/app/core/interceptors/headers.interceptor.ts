import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { apiHeaders } from 'src/assets/api-headers';
import { Store } from '@ngrx/store';
import { IMainState } from 'src/app/+store';
import { AuthService } from '../services/auth.service';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let clonedReq = request.clone({
      setHeaders: {
        "X-Parse-Application-Id": apiHeaders.apiId,
        "X-Parse-REST-API-Key": apiHeaders.apiKey,
        "X-Parse-Revocable-Session": "1",
        "content-type": "application/json",
      }
    })

    if (localStorage.getItem('sessionToken')) {
      clonedReq = clonedReq.clone({
        headers: clonedReq.headers.set("X-Parse-Session-Token", localStorage.getItem('sessionToken'))
      })
    }

    return next.handle(clonedReq);
  }
}
