import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'componentA', loadChildren: './components/component-a/feature-a.module#FeatureAModule' },
  { path: 'componentB', loadChildren: './components/component-b/feature-b.module#FeatureBModule' }
];

@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
