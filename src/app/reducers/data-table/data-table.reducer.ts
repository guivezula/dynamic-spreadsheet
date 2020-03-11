import { createReducer, on, Action } from '@ngrx/store';
import * as DataTableActions from './data-table.actions';
import { BaseType } from 'src/app/models/base-type';
import * as R from 'ramda';

export const dataTableFeatureKey = 'dataTable';

export interface State {
  data: any[];
  types: BaseType[];
  loading: boolean;
  minRows: number;
}

export const initialState: State = {
  data: [],
  types: [],
  loading: false,
  minRows: 10,
};

const dataReducer = createReducer(
  initialState,

  on(DataTableActions.updateTable, state => ({
    ...state,
    loading: true,
  })),

  on(DataTableActions.updateTableSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
  })),

  on(DataTableActions.updateTypes, state => ({
    ...state,
  })),

  on(DataTableActions.updateTypesSuccess, (state, { types }) => ({
    ...state,
    types,
  })),

  on(DataTableActions.updateType, (state, { index, newName }) => {
    const types: BaseType[] = R.clone(state.types);
    types[index].name = newName;
    return {
      ...state,
      types,
    };
  }),

  on(DataTableActions.updateMinRows, (state, { minRows }) => ({
    ...state,
    minRows,
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return dataReducer(state, action);
}
