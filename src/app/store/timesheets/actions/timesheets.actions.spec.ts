import * as fromTimesheets from './timesheets.actions';

describe('loadTimesheetss', () => {
  it('should return an action', () => {
    expect(fromTimesheets.loadTimesheetss().type).toBe('[Timesheets] Load Timesheetss');
  });
});
