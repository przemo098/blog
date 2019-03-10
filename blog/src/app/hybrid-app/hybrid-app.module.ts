import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HybridAppRoutingModule } from './hybrid-app-routing.module';
import { HybridAppComponent } from './hybrid-app/hybrid-app.component';
import { ReactComponent } from './react/react.component';

@NgModule({
  imports: [
    CommonModule,
    HybridAppRoutingModule
  ],
  declarations: [HybridAppComponent, ReactComponent]
})
export class HybridAppModule { }
