import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimesheetsEffects } from './timesheets.effects';

describe('TimesheetsEffects', () => {
  let actions$: Observable<any>;
  let effects: TimesheetsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimesheetsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TimesheetsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
