import { Routes } from "@angular/router";
import { AboutComponent } from "../pages/about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WelcomePageComponent } from "../pages/welcome-page/welcome-page.component";
import { UrlPaths } from "./UrlPaths";
import { JourneyComponent } from "../pages/journeys/journeys.component";
import {CvInteractiveComponent} from "../cv-interactive/cv-interactive.component";

export const appRoutes: Routes = [
  {
    path: "cat",
    component: AboutComponent,
    data: { title: "About Kaminsky" }
  },
  {
    path: 'hybrid',
    loadChildren: () => import('../hybrid-app-module/hybrid-app.module').then(m => m.HybridAppModule),
    data: {}
  },
  {
    path: "",
    component: WelcomePageComponent,
    data: { title: "About Kaminsky" }
  },
  {
    path: UrlPaths.journeys,
    component: JourneyComponent,
    data: { title: "About Kaminsky" }
  },
  {
    path: "cvInteractive",
    component: CvInteractiveComponent,
    data: {}
  },
  {
    path: "**",
    component: PageNotFoundComponent,
    data: {}
  }
];
