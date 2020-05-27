import { createAction, props } from '@ngrx/store';


export const initProjectss = createAction(
  '[Projects] Init Projectss',
  props<{ data: any }>()
);

export const loadProjectss = createAction(
  '[Projects] Load Projectss'
);

export const loadProjectssSuccess = createAction(
  '[Projects] Load Projectss Success',
  props<{ data: any }>()
);

export const loadProjectssFailure = createAction(
  '[Projects] Load Projectss Failure',
  props<{ error: any }>()
);

export const clearProjects = createAction(
  '[Projects] Clear Projectss '
);

export const cacheProjects = createAction(
  '[Projects] Cache Projectss',
  props<{ data: any }>()
);
