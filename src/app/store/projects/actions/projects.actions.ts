import { createAction, props } from '@ngrx/store';

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
  '[Projects] clear Projectss '
);
