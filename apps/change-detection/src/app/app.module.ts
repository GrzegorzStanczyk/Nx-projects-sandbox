import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { ShapeComponent } from './shape/shape.component';
import { CoordComponent } from './coord/coord.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { initialState as appInitialState, appReducer } from './+state/app.reducer';
import { AppEffects } from './+state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { AppFacade } from './+state/app.facade';

@NgModule({
  declarations: [AppComponent, ShapeComponent, CoordComponent],
  imports: [BrowserModule, NxModule.forRoot(), StoreModule.forRoot(
  { app: appReducer },
  {
    initialState : { app : appInitialState },
    metaReducers : !environment.production ? [storeFreeze] : []
  }
), EffectsModule.forRoot([AppEffects]), !environment.production ? StoreDevtoolsModule.instrument() : []],
  providers: [AppFacade],
  bootstrap: [AppComponent]
})
export class AppModule {}
