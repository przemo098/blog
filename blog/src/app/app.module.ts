import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './routing/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routing/routing';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { AboutModule } from './pages/about/about.module';
import { HttpClientModule } from '@angular/common/http';
import { JourneyComponent } from './pages/journeys/journeys.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomePageComponent,
    JourneyComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,

    // PrimeNG
    AboutModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
