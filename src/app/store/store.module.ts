import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

import {reducers, metaReducers} from './reducers';
import {environment} from '../../environments/environment';
import {ProjectsEffects} from './projects/effects/projects.effects';
import {ActivitesEffects} from './activites/effects/activites.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot([
      ProjectsEffects,
      ActivitesEffects
    ]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
export class AppStoreModule {
}
