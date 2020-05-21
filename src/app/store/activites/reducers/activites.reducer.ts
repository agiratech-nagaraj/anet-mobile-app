import { Action, createReducer, on } from '@ngrx/store';
import * as ActivitesActions from '../actions/activites.actions';
import * as ProjectsActions from '../../projects/actions/projects.actions';

export const activitesFeatureKey = 'activites';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(ActivitesActions.loadActivitess, state => state),
  on(ActivitesActions.loadActivitessSuccess, (state, action) => ({...state, data: action.data})),
  on(ActivitesActions.loadActivitessFailure, (state, action) => ({...state, error: action.error})),
  on(ActivitesActions.clearActivities, (state) => ({ data: null}))

);

