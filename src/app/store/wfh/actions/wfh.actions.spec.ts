import * as fromWFH from './wfh.actions';

describe('loadWFHs', () => {
  it('should return an action', () => {
    expect(fromWFH.loadWFHs().type).toBe('[WFH] Load WFHs');
  });
});
