
import { BaseType } from 'src/app/models/base-type';
import { createReducer, on, Action } from '@ngrx/store';
import * as TypesActions from './types.actions';

export const typesFeatureKey = 'types';

export interface State {
  types: BaseType<string>[];
  loading: boolean;
}

export const initialState: State = {
  types: [],
  loading: false,
};

const typesReducer = createReducer(
  initialState,

  on(TypesActions.loadTypes, state => ({
    ...state,
    loading: true,
  })),

  on(TypesActions.loadTypesSuccess, (state, { types }) => ({
    ...state,
    types,
    loading: false,
  })),

);

export function reducer(state: State | undefined, action: Action): State {
  return typesReducer(state, action);
}
