import * as fromTimesheets from '../reducers/timesheets.reducer';
import { selectTimesheetsState } from './timesheets.selectors';

describe('Timesheets Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTimesheetsState({
      [fromTimesheets.timesheetsFeatureKey]: {}
    });

    expect(result).toEqual({data: null, loading: false});
  });
});
