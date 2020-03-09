import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

// // Reducers
import * as fromDataTable from './data-table/data-table.reducer';

// // Effects
import { DataTableEffects } from './data-table/data-table.effects';

export function localStorageSyncReducer(myReducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [{ dataTable: ['data', 'types', 'minRows'] }],
    rehydrate: true,
  })(myReducer);
}

// tslint:disable-next-line:no-empty-interface
export interface State {
  dataTable: fromDataTable.State;
}

export const reducers: ActionReducerMap<State> = {
  dataTable: fromDataTable.reducer,
};

export const effects = [
  DataTableEffects,
];

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];
