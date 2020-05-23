import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WFHEffects } from './wfh.effects';

describe('WFHEffects', () => {
  let actions$: Observable<any>;
  let effects: WFHEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WFHEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(WFHEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
