import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import * as fromActivites from '../activites/reducers/activites.reducer';
import * as fromProjects from '../projects/reducers/projects.reducer';


export interface State {
  [fromProjects.projectsFeatureKey]: fromProjects.State;
  [fromActivites.activitesFeatureKey]: fromActivites.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromActivites.activitesFeatureKey]: fromActivites.reducer,
  [fromProjects.projectsFeatureKey]: fromProjects.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
