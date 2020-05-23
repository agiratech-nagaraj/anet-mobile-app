import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as TimesheetsActions from '../actions/timesheets.actions';
import {ApiService} from '../../../core/api.service';



@Injectable()
export class TimesheetsEffects {

  loadTimesheetss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TimesheetsActions.loadTimesheetss),
      concatMap((action) =>
        this.apiService.getTimeSheet(action.pageNo, action.duration).pipe(
          map(data => TimesheetsActions.loadTimesheetssSuccess({ data })),
          catchError(error => of(TimesheetsActions.loadTimesheetssFailure({ error }))))
      )
    );
  });



  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

}
