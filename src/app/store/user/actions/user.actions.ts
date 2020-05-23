import { createAction, props } from '@ngrx/store';
import {User} from '../../../core/models/http/responses/sign-in.response';

export const loadUsers = createAction(
  '[User] Load Users',
  props<User>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: any }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);
