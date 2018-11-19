import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { Timer1Component } from './timer1/timer1.component';
import { Timer2Component } from './timer2/timer2.component';

@NgModule({
  declarations: [AppComponent, Timer1Component, Timer2Component],
  imports: [BrowserModule, NxModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
