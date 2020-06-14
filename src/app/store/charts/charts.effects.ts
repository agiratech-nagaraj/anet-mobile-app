import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ChartsActions from './charts.actions';
import {ApiService} from "../../core/api.service";



@Injectable()
export class ChartsEffects {

  loadChartss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ChartsActions.loadChartss),
      concatMap((action) =>

        this.api.getChartsData(action.payload).pipe(
          map(data => ChartsActions.loadChartssSuccess({ data })),
          catchError(error => of(ChartsActions.loadChartssFailure({ error }))))
      )
    );
  });



  constructor(
    private actions$: Actions,
    private api: ApiService
  ) {}

}
