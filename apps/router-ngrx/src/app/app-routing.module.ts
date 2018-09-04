import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentAComponent } from './components/component-a/component-a.component';
import { ComponentBComponent } from './components/component-b/component-b.component';

export const routes: Routes = [
  { path: 'componentA', component: ComponentAComponent },
  { path: 'componentB', component: ComponentBComponent }
];

@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
