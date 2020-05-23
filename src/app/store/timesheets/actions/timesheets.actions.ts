import {createAction, props} from '@ngrx/store';

export const loadTimesheetss = createAction(
  '[Timesheets] Load Timesheetss',
  props<{ pageNo: number, duration: string }>()
);

export const loadTimesheetssSuccess = createAction(
  '[Timesheets] Load Timesheetss Success',
  props<{ data: any }>()
);

export const loadTimesheetssFailure = createAction(
  '[Timesheets] Load Timesheetss Failure',
  props<{ error: any }>()
);
