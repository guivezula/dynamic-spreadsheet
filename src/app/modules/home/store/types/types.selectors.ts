import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTypes from './types.reducer';

export const selectTypesState = createFeatureSelector<fromTypes.State>(
  fromTypes.typesFeatureKey
);

export const selectTypesLoading = createSelector(selectTypesState, state => state.loading);
export const selectTypes = createSelector(selectTypesState, state => state.types);
