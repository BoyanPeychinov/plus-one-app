import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';

const routes: Routes = [
  
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'events',
    loadChildren: () => import('./parts/events/events.module').then(mod => mod.EventsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
