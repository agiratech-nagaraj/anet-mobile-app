import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import {DatePipe} from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {AndroidFullScreen} from '@ionic-native/android-full-screen/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {StorageModule} from './storage/storage.module';
import {CoreModule} from './core/core.module';
import {AppStoreModule} from './store/store.module';
import {ProjectsEffects} from './store/projects/effects/projects.effects';
import {ActivitesEffects} from './store/activites/effects/activites.effects';
import {UserEffects} from './store/user/effects/user.effects';
import {WFHEffects} from './store/wfh/effects/wfh.effects';
import {TimesheetsEffects} from './store/timesheets/effects/timesheets.effects';
import {ChartsEffects} from './store/charts/charts.effects';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    StorageModule,
    CoreModule,
    AppStoreModule,
    EffectsModule.forRoot([
      ProjectsEffects,
      ActivitesEffects,
      UserEffects,
      WFHEffects,
      TimesheetsEffects,
      ChartsEffects,
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {  enabled: false, registrationStrategy: 'registerImmediately' }),
  ],
  providers: [
    AndroidFullScreen,
    DatePipe,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
