import { createReducer, on, Action } from '@ngrx/store';
import * as DataTableActions from './data-table.actions';
import { BaseType } from 'src/app/models/base-type';
import { DataItem } from 'src/app/models/data';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

const dataAdapter: EntityAdapter<DataItem> = createEntityAdapter<DataItem>({
  selectId: data => (`${data.index}.${data.column}`),
});

const typesAdapter: EntityAdapter<BaseType> = createEntityAdapter<BaseType>({
  selectId: type => type.name,
});

export const dataTableFeatureKey = 'dataTable';

export interface DataEntity extends EntityState<DataItem> {}
export interface TypesEntity extends EntityState<BaseType> {}

const dataEmptyEntity: DataEntity = dataAdapter.getInitialState({});
const typesEmptyEntity: TypesEntity = typesAdapter.getInitialState({});

export const selectAllData = dataAdapter.getSelectors<State>(state => state.data).selectAll;
export const selectAllTypes = typesAdapter.getSelectors<State>(state => state.types).selectAll;

export interface State {
  data: DataEntity;
  types: TypesEntity;
  loading: boolean;
  minRows: number;
}

export const initialState: State = {
  data: dataEmptyEntity,
  types: typesEmptyEntity,
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
      loading: false,
  })),

  on(DataTableActions.updateTypes, state => ({
    ...state,
  })),

  on(DataTableActions.updateTypesSuccess, (state, { baseType }) => ({
    ...state,
    types: typesAdapter.addOne(baseType, state.types),
  })),

  on(DataTableActions.updateTableTitle, state => ({
      ...state,
      loading: true,
  })),

  on(DataTableActions.updateTableTitle, (state, { oldTitle, title, updatedData }) => ({
      ...state,
      data: dataAdapter.updateMany(updatedData, state.data),
      types: typesAdapter.updateOne({ id: oldTitle, changes: { name: title } }, state.types),
      loading: false,
  })),

  on(DataTableActions.updateMinRows, (state, { minRows }) => ({
    ...state,
    minRows,
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return dataReducer(state, action);
}
