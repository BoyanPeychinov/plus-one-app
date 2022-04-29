import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { filter, map, Observable, tap } from 'rxjs';

@Injectable()
export class ClassesInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: this.handleResponse(event) })
        }

        return event;
      })
    )
  }

  private handleResponse(event: any): any {
    if (event.body.results && event.body.results.hasOwnProperty('day')) {
      const body = event.body.results;
      const newBody = [];
      for (let obj of body) {
        const date = obj.day.iso;
        obj = { ...obj, day: date }
        newBody.push(obj);
      }
      return newBody;

    } else if (event.body.hasOwnProperty('day')) {
      const body = event.body;
      const date = body.day.iso;
      const newBody = { ...body, day: date };

      return newBody;
    } else if (event.body.results) {
      const body = event.body.results;
      const newBody = [];
      for (let obj of body) {
        obj = { ...obj }
        newBody.push(obj);
      }
      return newBody;
    }
  }

  private handleRequest(event: any): any {
    const date = event.body.day;
    const body = {
      ...event.body, day: {
        "__type": "Date",
        "iso": date
      }
    };

    console.log(body)

    return body;
  }
}
