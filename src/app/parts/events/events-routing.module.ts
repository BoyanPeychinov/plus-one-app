import { RouterModule, Routes } from "@angular/router";
import { EventCreatePageComponent } from "./event-create-page/event-create-page.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { EventsPageComponent } from "./events-page/events-page.component";

const routes: Routes = [
    {
        path: 'all',
        // pathMatch: 'full',
        component: EventsPageComponent
    },
    {
        path: 'new-event',
        component: EventCreatePageComponent
    },
    {
        path: ':eventId',
        component: EventDetailsComponent
    },
]

export const EventsRoutingModule = RouterModule.forChild(routes);