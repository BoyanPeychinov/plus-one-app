import { RouterModule, Routes } from "@angular/router";
import { EventCreatePageComponent } from "./event-create-page/event-create-page.component";
import { EventsPageComponent } from "./events-page/events-page.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: EventsPageComponent
    },
    {
        path: 'new-event',
        component: EventCreatePageComponent
    },
]

export const EventsRoutingModule = RouterModule.forChild(routes);