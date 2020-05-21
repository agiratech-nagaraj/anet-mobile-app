import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {StorageModule} from './storage/storage.module';
import {CoreModule} from './core/core.module';
import {AppStoreModule} from './store/store.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    StorageModule,
    CoreModule,
    AppStoreModule,
    EffectsModule.forRoot([]),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
