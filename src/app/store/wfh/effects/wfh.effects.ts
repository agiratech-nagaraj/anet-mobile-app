import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as WFHActions from '../actions/wfh.actions';
import {ApiService} from '../../../core/api.service';



@Injectable()
export class WFHEffects {

  loadWFHs$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(WFHActions.loadWFHs),
      concatMap((action) =>
        this.apiService.getWFHList(action.pageNo, action.thisMonth).pipe(
          map(data => WFHActions.loadWFHsSuccess({ data })),
          catchError(error => of(WFHActions.loadWFHsFailure({ error }))))
      )
    );
  });



  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

}