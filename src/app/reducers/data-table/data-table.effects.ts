import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import * as DataTableActions from './data-table.actions';

import { concatMap, withLatestFrom, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { selectTypes } from './data-table.selectors';
import { Store } from '@ngrx/store';



@Injectable()
export class DataTableEffects {

  updateTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataTableActions.updateTypes),
      withLatestFrom(this.store.select(selectTypes)),
      map(([ { baseType }, oldTypes]) => {
        const types = Object.assign([], oldTypes);
        types.push(baseType);
        return DataTableActions.updateTypesSuccess({ types });
      }),
    );
  });

  updateTitle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataTableActions.updateTableTitle),
      map(props => {
        return DataTableActions.updateTableTitleSuccess(props);
      }),
    );
  });

  registerItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataTableActions.registerItem),
      map(({ item }) => {
        return DataTableActions.registerItemSuccess({ item });
      }),
    );
  });

  constructor(private actions$: Actions, private store: Store<any>) {}

}
