import * as fromCharts from './charts.actions';

describe('loadChartss', () => {
  it('should return an action', () => {
    expect(fromCharts.loadChartss(null).type).toBe('[Charts] Load Chartss');
  });
});
