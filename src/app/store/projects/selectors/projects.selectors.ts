import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromProjects from '../reducers/projects.reducer';

export const selectProjectsState = createFeatureSelector<fromProjects.State>(
  fromProjects.projectsFeatureKey
);

export const selectProjectListState = createSelector(selectProjectsState,
  (res) => {
    return res?.data?.result ?? [];
  }
);
