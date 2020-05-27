import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWFH from '../reducers/wfh.reducer';

export const selectWFHState = createFeatureSelector<fromWFH.State>(
  fromWFH.wFHFeatureKey
);

export const selectWFHListState = createSelector(selectWFHState, state => {
  return state?.data?.result?.work_from_homes ?? [];
});

export const selectWFHCountState = createSelector(selectWFHState, (state) => {
  return state?.data?.result?.count;
});
