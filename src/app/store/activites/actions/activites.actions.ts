import { createAction, props } from '@ngrx/store';

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
  '[Activites] clear Activites '
);
