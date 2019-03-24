import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routing';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ParticlesModule } from 'angular-particle';
import { AboutModule } from './about/about.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomePageComponent
  ],
  imports: [
    ParticlesModule,
    FormsModule,
    BrowserAnimationsModule,

    // PrimeNG
    AboutModule,
    BrowserModule,
    // ButtonModule,
    // MenuModule,
    // MenubarModule,
    // SidebarModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule, 
    AngularSvgIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
