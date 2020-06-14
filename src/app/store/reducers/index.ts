import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import {environment} from '../../../environments/environment';
import * as fromActivites from '../activites/reducers/activites.reducer';
import * as fromProjects from '../projects/reducers/projects.reducer';
import * as fromUser from '../user/reducers/user.reducer';
import * as fromTimesheets from '../timesheets/reducers/timesheets.reducer';
import * as fromWFH from '../wfh/reducers/wfh.reducer';
import * as fromCharts from '../charts/charts.reducer';


export interface State {
  [fromProjects.projectsFeatureKey]: fromProjects.State;
  [fromActivites.activitesFeatureKey]: fromActivites.State;
  [fromUser.userFeatureKey]: fromUser.State;
  [fromTimesheets.timesheetsFeatureKey]: fromTimesheets.State;
  [fromWFH.wFHFeatureKey]: fromWFH.State;
  [fromCharts.chartsFeatureKey]: fromCharts.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromActivites.activitesFeatureKey]: fromActivites.reducer,
  [fromProjects.projectsFeatureKey]: fromProjects.reducer,
  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromTimesheets.timesheetsFeatureKey]: fromTimesheets.reducer,
  [fromWFH.wFHFeatureKey]: fromWFH.reducer,
  [fromCharts.chartsFeatureKey]: fromCharts.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
