import { RouterModule, Routes } from '@angular/router';
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
];

export const AppRoutingModule = RouterModule.forRoot(routes);
