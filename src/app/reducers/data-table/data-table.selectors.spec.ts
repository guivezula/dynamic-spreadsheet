import * as fromDataTable from './data-table.reducer';
import { selectDataTableState } from './data-table.selectors';

describe('DataTable Selectors', () => {
  it('should select the feature state', () => {
    const result = selectDataTableState({
      [fromDataTable.dataTableFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
