import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';

import { withLatestFrom, map } from 'rxjs/operators';
import * as TypesActions from './types.actions';
import { Store } from '@ngrx/store';
import { selectTypes } from './types.selectors';
import { BaseType } from 'src/app/models/base-type';



@Injectable()
export class TypesEffects {


  @Effect()
  loadTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TypesActions.loadTypes),
      withLatestFrom(this.store.select(selectTypes)),
      map(([ { baseType }, oldTypes]) => {
        const types = Object.assign([], oldTypes);
        types.push(baseType);
        return TypesActions.loadTypesSuccess({ types });
      }),
    );
  });

  constructor(private actions$: Actions, private store: Store<any>) {}

}
