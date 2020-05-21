import { Action, createReducer, on } from '@ngrx/store';
import * as ProjectsActions from '../actions/projects.actions';
import {ProjectsListResponse} from '../../../core/models/http/responses/projects-list.response';

export const projectsFeatureKey = 'projects';

export interface State {
  data: ProjectsListResponse;
}

export const initialState: State = {
 data: null,
};


export const reducer = createReducer(
  initialState,

  on(ProjectsActions.loadProjectss, state => state),
  on(ProjectsActions.loadProjectssSuccess, (state, action) => ({...state, data: action.data})),
  on(ProjectsActions.loadProjectssFailure, (state, action) => ({...state, error: action.error})),
  on(ProjectsActions.clearProjects, (state) => ({ data: null, error: null}))
);

