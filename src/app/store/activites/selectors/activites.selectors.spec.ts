import * as fromActivites from '../reducers/activites.reducer';
import { selectActivitesState } from './activites.selectors';

describe('Activites Selectors', () => {
  it('should select the feature state', () => {
    const result = selectActivitesState({
      [fromActivites.activitesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
