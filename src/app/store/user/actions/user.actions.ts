import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ data: any }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: any }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);
