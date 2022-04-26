import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: WelcomeComponent
    }
]

export const SharedRoutingModule = RouterModule.forChild(routes);