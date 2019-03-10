import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HybridAppComponent } from './hybrid-app/hybrid-app.component';

const routes: Routes = [
  {
    path: "",
    component: HybridAppComponent,
    data: { title: "About Kaminsky" }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HybridAppRoutingModule { }
