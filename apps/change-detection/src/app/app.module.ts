import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { ShapeComponent } from './shape/shape.component';
import { CoordComponent } from './coord/coord.component';

@NgModule({
  declarations: [AppComponent, ShapeComponent, CoordComponent],
  imports: [BrowserModule, NxModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
