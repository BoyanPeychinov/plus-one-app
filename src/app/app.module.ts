import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/services/auth.service';
import { EventsModule } from './parts/events/events.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { currentUserReducer, IMainState } from './+store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    EventsModule,
    CoreModule.forRoot(),
    StoreModule.forRoot<IMainState>({
      currentUser: currentUserReducer,
    }),
    StoreDevtoolsModule.instrument(
      {
        maxAge: 25,
        logOnly: environment.production
      }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => {
        return () => authService.authenticate();
      },
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
