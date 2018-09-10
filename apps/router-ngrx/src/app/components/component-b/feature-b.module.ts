import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureBRoutingModule } from './feature-b-routing.module';
import { ComponentBComponent } from './component-b.component';

@NgModule({
  imports: [
    CommonModule,
    FeatureBRoutingModule
  ],
  declarations: [ComponentBComponent]
})
export class FeatureBModule { }
