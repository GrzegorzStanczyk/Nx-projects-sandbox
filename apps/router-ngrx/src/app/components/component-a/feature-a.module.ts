import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureARoutingModule } from './feature-a-routing.module';
import { ComponentAComponent } from './component-a.component';

@NgModule({
  imports: [
    CommonModule,
    FeatureARoutingModule
  ],
  declarations: [ComponentAComponent]
})
export class FeatureAModule { }
