import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ChartsEffects } from './charts.effects';

describe('ChartsEffects', () => {
  let actions$: Observable<any>;
  let effects: ChartsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChartsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ChartsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
