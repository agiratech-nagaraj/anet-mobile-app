import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap, tap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as ProjectsActions from '../actions/projects.actions';
import {ApiService} from '../../../core/api.service';
import {cacheProjects} from '../actions/projects.actions';


@Injectable()
export class ProjectsEffects {

  loadProjectss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.loadProjectss),
      concatMap(() => this.api.getProjectsList().pipe(
        map(data => ProjectsActions.loadProjectssSuccess({data})),
        catchError(error => of(ProjectsActions.loadProjectssFailure({error}))))
      )
    );
  });

  cacheProjectss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.loadProjectssSuccess),
      map(action => cacheProjects({data: action?.data}))
    );
  }, {dispatch: false});

  constructor(
    private actions$: Actions,
    private api: ApiService
  ) {
  }

}
