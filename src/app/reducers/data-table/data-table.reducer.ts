import { createReducer, on, Action } from '@ngrx/store';
import * as DataTableActions from './data-table.actions';
import { BaseType } from 'src/app/models/base-type';
import * as R from 'ramda';
import { DataItem } from 'src/app/models/data';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

const dataAdapter: EntityAdapter<DataItem> = createEntityAdapter<DataItem>({
  selectId: data => (`${data.index}.${data.column}`),
});

const dataEmptyEntity: DataEntity = dataAdapter.getInitialState({});

export const dataTableFeatureKey = 'dataTable';
export interface DataEntity extends EntityState<DataItem> {}

export const {
  selectAll
} = dataAdapter.getSelectors<State>(state => state.data);

export interface State {
  data: DataEntity;
  types: BaseType[];
  loading: boolean;
  minRows: number;
}

export const initialState: State = {
  data: dataEmptyEntity,
  types: [],
  loading: false,
  minRows: 10,
};

const dataReducer = createReducer(
  initialState,

  on(DataTableActions.registerItem, state => ({
      ...state,
      loading: true,
  })),

  on(DataTableActions.registerItemSuccess, (state, { item }) => ({
      ...state,
      data: dataAdapter.upsertOne(item, state.data),
      loading: true,
  })),

  on(DataTableActions.updateTypes, state => ({
    ...state,
  })),

  on(DataTableActions.updateTypesSuccess, (state, { types }) => ({
    ...state,
    types,
  })),

  on(DataTableActions.updateTableTitle, state => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(DataTableActions.updateTableTitle, (state, { index, title, updatedData }) => {
    const types: BaseType[] = R.clone(state.types);
    types[index].name = title;
    return {
      ...state,
      data: dataAdapter.updateMany(updatedData, state.data),
      types,
      loading: false,
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
