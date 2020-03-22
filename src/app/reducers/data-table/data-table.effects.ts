import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as DataTableActions from './data-table.actions';

import { map } from 'rxjs/operators';



@Injectable()
export class DataTableEffects {

  updateTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataTableActions.updateTypes),
      map(({ baseType }) => DataTableActions.updateTypesSuccess({ baseType })),
    );
  });

  updateTitle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataTableActions.updateTableTitle),
      map(props => DataTableActions.updateTableTitleSuccess(props)),
    );
  });

  registerItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataTableActions.registerItem),
      map(({ item }) => DataTableActions.registerItemSuccess({ item })),
    );
  });

  constructor(private actions$: Actions) {}

}
