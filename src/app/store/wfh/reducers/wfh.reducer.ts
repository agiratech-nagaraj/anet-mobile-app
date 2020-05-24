import { Action, createReducer, on } from '@ngrx/store';

import * as WFHActions from '../actions/wfh.actions';
import {WFHListResponse} from '../../../core/models/http/responses/wfh-list.response';

export const wFHFeatureKey = 'wFH';

export interface State {
  data: WFHListResponse;

}

export const initialState: State = {
 data: null
};


export const reducer = createReducer(
  initialState,

  on(WFHActions.loadWFHs, state => state),
  on(WFHActions.loadWFHsSuccess, (state, action) => ({...state, data: action.data})),
  on(WFHActions.loadWFHsFailure, (state, action) => ({...state, error: action.error})),
  on(WFHActions.clearWFH, (state, action) => ({data: null, error: null})),

);

