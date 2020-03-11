import { createAction, props } from '@ngrx/store';
import { BaseType } from 'src/app/models/base-type';

export const updateTable = createAction(
  '[Data] Update Table',
  props<{ data: any[] }>()
);

export const updateTableSuccess = createAction(
  '[Data] Update Table Success',
  props<{ data: any[] }>()
);

export const updateTypes = createAction(
  '[Data] Update Types',
  props<{ baseType: BaseType }>()
);

export const updateTypesSuccess = createAction(
  '[Data] Update Types Success',
  props<{ types: BaseType[] }>()
);

export const updateType = createAction(
  '[Data] Update Type',
  props<{ index: number, newName: string }>()
);

export const updateMinRows = createAction(
  '[Data] Update Min Rows Number',
  props<{ minRows: number }>()
);
