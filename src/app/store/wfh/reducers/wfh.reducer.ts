import { createReducer, on } from '@ngrx/store';

import * as WFHActions from '../actions/wfh.actions';
import {WFHListResponse} from '../../../core/models/http/responses/wfh-list.response';

export const wFHFeatureKey = 'wFH';

export interface State {
  data: WFHListResponse;
  loading: boolean;

}

export const initialState: State = {
 data: null,
 loading: false
};


export const reducer = createReducer(
  initialState,

  on(WFHActions.loadWFHs, state => ({...state, loading: true})),
  on(WFHActions.loadWFHsSuccess, (state, action) => ({...state, data: action.data, error: null, loading: false})),
  on(WFHActions.loadWFHsFailure, (state, action) => ({...state, error: action.error, loading: false})),
  on(WFHActions.clearWFH, (state, action) => ({...state, data: null, error: null})),

);

