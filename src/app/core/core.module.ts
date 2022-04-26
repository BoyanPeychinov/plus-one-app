import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from './services/events.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassesInterceptor } from './interceptors/classes.interceptor';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        EventsService,
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: ClassesInterceptor,
        },
      ]
    }
  }
}