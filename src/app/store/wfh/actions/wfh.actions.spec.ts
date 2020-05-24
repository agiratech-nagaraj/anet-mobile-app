import * as fromWFH from './wfh.actions';

describe('loadWFHs', () => {
  it('should return an action', () => {
    expect(fromWFH.loadWFHs({pageNo: 1, thisMonth: true}).type).toBe('[WFH] Load WFHs');
  });
});
