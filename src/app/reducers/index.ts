import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { TypesEffects } from '../modules/home/store/types/types.effects';

// // Reducers
import * as fromTypes from '../modules/home/store/types/types.reducer';
// import * as fromSpecies from './species/species.reducer';

// // Effects
// import { AuthEffects } from './auth/auth.effects';
// import { SpeciesEffects } from './species/species.effects';

export function localStorageSyncReducer(myReducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [],
    rehydrate: true,
  })(myReducer);
}

// tslint:disable-next-line:no-empty-interface
export interface State {
}

export const reducers: ActionReducerMap<State> = {
};

export const effects = [];

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];
