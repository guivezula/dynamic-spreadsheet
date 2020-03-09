import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DataTableEffects } from './data-table.effects';

describe('DataTableEffects', () => {
  let actions$: Observable<any>;
  let effects: DataTableEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataTableEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<DataTableEffects>(DataTableEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
