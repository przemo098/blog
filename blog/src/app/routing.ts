import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";

export const appRoutes: Routes = [
  {
    path: "cat",
    component: AboutComponent,
    data: { title: "About Kaminsky" }
  },

  {
    path: 'hybrid',
    loadChildren: './hybrid-app/hybrid-app.module#HybridAppModule'
  },
  {
    path: "",
    component: WelcomePageComponent,
    data: { title: "About Kaminsky" }
  },  
  {
    path: "**",
    component: PageNotFoundComponent
  }

];
