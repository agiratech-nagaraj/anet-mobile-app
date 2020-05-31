import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map} from 'rxjs/operators';
import { of} from 'rxjs';

import * as UserActions from '../actions/user.actions';


@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      map(action => UserActions.loadUsersSuccess({data: action.data})),
      catchError(error => of(UserActions.loadUsersFailure({error}))));
  });


  constructor(private actions$: Actions) {
  }

}
