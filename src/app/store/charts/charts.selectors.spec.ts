import * as fromCharts from './charts.reducer';
import { selectChartsState } from './charts.selectors';

describe('Charts Selectors', () => {
  it('should select the feature state', () => {
    const result = selectChartsState({
      [fromCharts.chartsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
