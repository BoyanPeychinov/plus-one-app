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
          console.log("Outside", event);
          event = event.clone({ body: this.handleResponse(event) })
        }

        return event;
      })
    )
  }

  private handleResponse(event: any): any {
    if (event.body.results) {
      console.log("First Inside", event.body.results);

      const body = event.body.results;
      const newBody = [];
      for (let obj of body) {
        if (obj.hasOwnProperty('day')) {
          const date = obj.day.iso;
          obj = { ...obj, day: date }
          newBody.push(obj);
        } else {
          obj = { ...obj }
          newBody.push(obj);
        }
      }
      return newBody;

    } else if (event.body.hasOwnProperty('day')) {
      console.log("Second Inside", event.body);

      const body = event.body;
      const date = body.day.iso;
      const newBody = { ...body, day: date };

      return newBody;

    // } else if (event.body.results) {
    //   console.log("Third Inside", event.body.results);

    //   const body = event.body.results;
    //   const newBody = [];
    //   for (let obj of body) {
    //     obj = { ...obj }
    //     newBody.push(obj);
    //   }

    //   console.log(newBody);
    //   return newBody;
    }
  }

  // private handleRequest(event: any): any {
  //   const date = event.body.day;
  //   const body = {
  //     ...event.body, day: {
  //       "__type": "Date",
  //       "iso": date
  //     }
  //   };

  //   console.log(body)

  //   return body;
  // }
}
