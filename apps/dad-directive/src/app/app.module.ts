import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { MovableDirective } from './movable.directive';
import { DraggableDirective } from './draggable.directive';
import { StopPropagationDirective } from './stop-propagation.directive';

@NgModule({
  declarations: [AppComponent, MovableDirective, DraggableDirective, StopPropagationDirective],
  imports: [BrowserModule, NxModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
