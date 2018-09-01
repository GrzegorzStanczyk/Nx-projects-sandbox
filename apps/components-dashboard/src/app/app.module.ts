import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@nx-projects-sandbox/components';
import { ContainersModule } from './containers/containers.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    ComponentsModule,
    ContainersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
