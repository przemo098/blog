import { Routes } from "@angular/router";
import { AboutComponent } from "../pages/about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WelcomePageComponent } from "../pages/welcome-page/welcome-page.component";
import UrlPaths from "./routes";
import { JourneyComponent } from "../pages/journeys/journeys.component";

export const appRoutes: Routes = [
  {
    path: "cat",
    component: AboutComponent,
    data: { title: "About Kaminsky" }
  },

  {
    path: 'hybrid',
    loadChildren: './hybrid-app-module/hybrid-app.module#HybridAppModule'
  },
  {
    path: "",
    component: WelcomePageComponent,
    data: { title: "About Kaminsky" }
  },  
  {
    path: "**",
    component: PageNotFoundComponent
  },  
  {
    path: UrlPaths.journeys,
    component: JourneyComponent,
    data: { title: UrlPaths.journeys }
  }
];
