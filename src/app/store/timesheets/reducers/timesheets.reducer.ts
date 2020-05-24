import {Action, createReducer, on} from '@ngrx/store';
import * as TimesheetsActions from '../actions/timesheets.actions';
import {TimesheetResponse} from '../../../core/models/http/responses/timesheet.response';

export const timesheetsFeatureKey = 'timesheets';

export interface State {
  data: TimesheetResponse;
}

export const initialState: State = {
  data: null
};


export const reducer = createReducer(
  initialState,

  on(TimesheetsActions.loadTimesheetss, state => state),
  on(TimesheetsActions.loadTimesheetssSuccess, (state, action) => ({...state, data: action.data})),
  on(TimesheetsActions.loadTimesheetssFailure, (state, action) => ({...state, error: action.error})),
  on(TimesheetsActions.clearTimesheets, (state, action) => ({data: null, error: null})),
);

