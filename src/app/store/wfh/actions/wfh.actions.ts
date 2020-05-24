import { createAction, props } from '@ngrx/store';

export const loadWFHs = createAction(
  '[WFH] Load WFHs',
  props<{pageNo: number, thisMonth: boolean}>()
);

export const loadWFHsSuccess = createAction(
  '[WFH] Load WFHs Success',
  props<{ data: any }>()
);

export const loadWFHsFailure = createAction(
  '[WFH] Load WFHs Failure',
  props<{ error: any }>()
);

export const clearWFH = createAction(
    '[WFH] clear WFH '
);
