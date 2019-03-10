import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {SidebarModule} from 'primeng/sidebar';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routing';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ParticlesModule } from 'angular-particle';
import { AboutModule } from './about/about.module';

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
    ButtonModule,
    MenuModule,
    MenubarModule,
    SidebarModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }