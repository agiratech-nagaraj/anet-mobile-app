import * as fromActivites from './activites.actions';

describe('loadActivitess', () => {
  it('should return an action', () => {
    expect(fromActivites.loadActivitess().type).toBe('[Activites] Load Activitess');
  });
});
