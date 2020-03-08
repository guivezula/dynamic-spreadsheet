import { Action, createAction, props } from '@ngrx/store';
import { BaseType } from 'src/app/models/base-type';


export const loadTypes = createAction(
  '[Types] Load Types',
  props<{ baseType: BaseType<string> }>()
);

export const loadTypesSuccess = createAction(
  '[Types] Load Types Success',
  props<{ types: BaseType<string>[] }>()
);

