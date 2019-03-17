import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HybridAppComponent } from './hybrid-app/hybrid-app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: "",
    component: HybridAppComponent,
    data: { title: "About Kaminsky" }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    FormsModule,
    CommonModule],
  exports: [RouterModule]
})
export class HybridAppRoutingModule { }
