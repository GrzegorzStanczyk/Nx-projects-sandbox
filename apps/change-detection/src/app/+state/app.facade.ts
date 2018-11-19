import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from './app.reducer';
import { appQuery } from './app.selectors';
import { LoadApp } from './app.actions';

@Injectable()
export class AppFacade {
  loaded$ = this.store.select(appQuery.getLoaded);
  allApp$ = this.store.select(appQuery.getAllApp);
  selectedApp$ = this.store.select(appQuery.getSelectedApp);

  constructor(private store: Store<{ app: AppState }>) {}

  loadAll() {
    this.store.dispatch(new LoadApp());
  }
}
