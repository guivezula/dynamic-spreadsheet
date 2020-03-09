import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import * as DataTableActions from './data-table.actions';

import { concatMap, withLatestFrom, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { selectTypes } from './data-table.selectors';
import { Store } from '@ngrx/store';



@Injectable()
export class DataTableEffects {

  @Effect()
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

  @Effect()
  updateData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataTableActions.updateTable),
      map(({ data }) => {
        return DataTableActions.updateTableSuccess({ data });
      }),
    );
  });

  constructor(private actions$: Actions, private store: Store<any>) {}

}
