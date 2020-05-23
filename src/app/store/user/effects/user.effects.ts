import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as UserActions from '../actions/user.actions';


@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      map(data => UserActions.loadUsersSuccess({data})),
      catchError(error => of(UserActions.loadUsersFailure({error}))));
  });


  constructor(private actions$: Actions) {
  }

}
