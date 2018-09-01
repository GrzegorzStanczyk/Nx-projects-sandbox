import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsContainerComponent } from './buttons-container/buttons-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonsContainerComponent
  ],
  exports: [
    ButtonsContainerComponent
  ]
})
export class ContainersModule { }
