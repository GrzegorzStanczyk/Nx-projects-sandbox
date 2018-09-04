import { AppAction, AppActionTypes } from './app.actions';
import { ActionReducerMap } from '@ngrx/store';
import { RouterStateUrl } from 'libs/services/src/lib/custom-serializer.service';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

/**
 * Interface for the 'App' data used in
 *  - AppState, and
 *  - appReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
  app: AppState;
}

export interface Entity {}

export interface AppState {
  list: Entity[]; // list of App; analogous to a sql normalized table
  selectedId?: string | number; // which App record has been selected
  loaded: boolean; // has the App list been loaded
  error?: any; // last none error (if any)
}

export const appInitialState: AppState = {
  list: [],
  loaded: false
};

export const initialState: State = {
  routerReducer: null,
  app: appInitialState
};

export function appReducer(
  state: AppState = appInitialState,
  action: AppAction
): AppState {
  switch (action.type) {
    case AppActionTypes.AppLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  app: appReducer
};
