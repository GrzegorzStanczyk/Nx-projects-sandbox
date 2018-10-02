import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';
import { RouterStateUrl } from 'libs/utils/src/lib/custom-router-serializer';
import { RouterReducerState } from '@ngrx/router-store';

// Lookup the 'App' feature state managed by NgRx
const getAppState = createFeatureSelector<AppState>('app');
const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

const getLoaded = createSelector(
  getAppState,
  (state: AppState) => state.loaded
);
const getError = createSelector(getAppState, (state: AppState) => state.error);

const getAllApp = createSelector(
  getAppState,
  getLoaded,
  (state: AppState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getAppState,
  (state: AppState) => state.selectedId
);
const getSelectedApp = createSelector(getAllApp, getSelectedId, (app, id) => {
  const result = app.find(it => it['id'] === id);
  return result ? Object.assign({}, result) : undefined;
});

export const appQuery = {
  getLoaded,
  getError,
  getAllApp,
  getSelectedApp
};

export const getListAndRouter = createSelector(
  getRouterState,
  getLoaded,
  (router, app) => {
    console.log('router.state.url: ', router);
    console.log('app: ', app);
    return router.state.url && app;
  }
)
