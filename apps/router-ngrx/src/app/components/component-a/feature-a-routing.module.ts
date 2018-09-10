import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentAComponent } from './component-a.component';

const routes: Routes = [
  { path: '', component: ComponentAComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureARoutingModule { }
