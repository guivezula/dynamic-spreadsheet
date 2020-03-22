import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDataTable from './data-table.reducer';

export const selectDataTableState = createFeatureSelector<fromDataTable.State>(
  fromDataTable.dataTableFeatureKey
);

export const selectLoading = createSelector(selectDataTableState, state => state.loading);
export const selectTypes = createSelector(selectDataTableState, state => state.types);
export const selectData = createSelector(selectDataTableState, fromDataTable.selectAll);
export const selectMinRows = createSelector(selectDataTableState, state => state.minRows);
