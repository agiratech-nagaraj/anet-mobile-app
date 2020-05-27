import {createAction, props} from '@ngrx/store';


export const initActivitess = createAction(
  '[Activites] init Activitess',
  props<{ data: any }>()
);

export const loadActivitess = createAction(
  '[Activites] Load Activitess'
);

export const loadActivitessSuccess = createAction(
  '[Activites] Load Activitess Success',
  props<{ data: any }>()
);

export const loadActivitessFailure = createAction(
  '[Activites] Load Activitess Failure',
  props<{ error: any }>()
);

export const clearActivities = createAction(
  '[Activites] Clear Activites '
);

export const cacheActivitess = createAction(
  '[Activites] Cache Activitess',
  props<{ data: any }>()
);
