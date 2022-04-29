import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
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
        canActivate: [AuthGuard],
        component: EventCreatePageComponent
    },
    {
        path: ':eventId',
        canActivate: [AuthGuard],
        component: EventDetailsComponent
    },
]

export const EventsRoutingModule = RouterModule.forChild(routes);