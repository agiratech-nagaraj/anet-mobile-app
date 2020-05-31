import {Action, createReducer, on} from '@ngrx/store';

import * as ProjectsActions from '../actions/projects.actions';
import {ProjectsListResponse} from '../../../core/models/http/responses/projects-list.response';
import {StorageKeys, StorageService} from '../../../storage';

export const projectsFeatureKey = 'projects';

export interface State {
  data: ProjectsListResponse;
  loading: boolean;
}

export const initialState: State = {
  data: null,
  loading: false
};


export const reducer = createReducer(
  initialState,

  on(ProjectsActions.initProjectss, (state, action) => ({...state, data: action?.data})),
  on(ProjectsActions.loadProjectss, state => ({...state, loading: true})),
  on(ProjectsActions.loadProjectssSuccess, (state, action) => ({...state, data: action.data, loading: false})),
  on(ProjectsActions.loadProjectssFailure, (state, action) => ({...state, error: action.error, loading: false})),
  on(ProjectsActions.clearProjects, (state) => ({...state, data: null, error: null})),
  on(ProjectsActions.cacheProjects, (state, action) => {
    StorageService.instance.setItem(StorageKeys.cachedProjects, action?.data, true);
    return state;
  })
  )
;

