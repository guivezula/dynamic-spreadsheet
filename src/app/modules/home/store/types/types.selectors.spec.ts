import * as fromTypes from './types.reducer';
import { selectTypesState } from './types.selectors';

describe('Types Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTypesState({
      [fromTypes.typesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
