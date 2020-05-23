import * as fromWFH from '../reducers/wfh.reducer';
import { selectWFHState } from './wfh.selectors';

describe('WFH Selectors', () => {
  it('should select the feature state', () => {
    const result = selectWFHState({
      [fromWFH.wFHFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
