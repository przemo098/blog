import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { CvComponent } from "./cv/cv.component";

export const appRoutes: Routes = [
  {
    path: "about",
    component: AboutComponent,
    data: { title: "About Kaminsky" }
  },

  {
    path: 'hybrid',
    loadChildren: './hybrid-app/hybrid-app.module#HybridAppModule'
  },
  {
    path: "cv",
    component: CvComponent,
    data: { title: "CV" }
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
