import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ProjectsActions from '../actions/projects.actions';
import {ApiService} from '../../../core/api.service';



@Injectable()
export class ProjectsEffects {

  loadProjectss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ProjectsActions.loadProjectss),
      concatMap(() =>
        this.api.getProjectsList().pipe(
          map(data => ProjectsActions.loadProjectssSuccess({ data })),
          catchError(error => of(ProjectsActions.loadProjectssFailure({ error }))))
      )
    );
  });



  constructor(
    private actions$: Actions,
    private api: ApiService
  ) {}

}
