import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ActivitesActions from '../actions/activites.actions';
import {ApiService} from '../../../core/api.service';



@Injectable()
export class ActivitesEffects {

  loadActivitess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ActivitesActions.loadActivitess),
      concatMap(() =>
        this.api.getActivitiesList().pipe(
          map(data => ActivitesActions.loadActivitessSuccess({ data })),
          catchError(error => of(ActivitesActions.loadActivitessFailure({ error }))))
      )
    );
  });



  constructor(
    private actions$: Actions,
    private api: ApiService
  ) {}

}
