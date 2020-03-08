import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TypesEffects } from './types.effects';

describe('TypesEffects', () => {
  let actions$: Observable<any>;
  let effects: TypesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TypesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<TypesEffects>(TypesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
