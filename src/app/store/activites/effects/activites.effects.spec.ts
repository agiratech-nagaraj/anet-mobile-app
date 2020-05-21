import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ActivitesEffects } from './activites.effects';

describe('ActivitesEffects', () => {
  let actions$: Observable<any>;
  let effects: ActivitesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivitesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ActivitesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
