import { createAction, props } from '@ngrx/store';
import { BaseType } from 'src/app/models/base-type';
import { DataItem } from 'src/app/models/data';
import { Update } from '@ngrx/entity';

export const registerItem = createAction(
  '[Data] Register Item',
  props<{ item: DataItem }>()
);

export const registerItemSuccess = createAction(
  '[Data] Register Item Success',
  props<{ item: DataItem }>()
);

export const updateTableTitle = createAction(
  '[Data] Update Table Title',
  props<{ oldTitle: string, title: string, updatedData: Update<DataItem>[] }>()
);

export const updateTableTitleSuccess = createAction(
  '[Data] Update Table Title Success',
  props<{ oldTitle: string, title: string, updatedData: Update<DataItem>[] }>()
);

export const updateTypes = createAction(
  '[Data] Update Types',
  props<{ baseType: BaseType }>()
);

export const updateTypesSuccess = createAction(
  '[Data] Update Types Success',
  props<{ baseType: BaseType }>()
);

export const updateMinRows = createAction(
  '[Data] Update Min Rows Number',
  props<{ minRows: number }>()
);
