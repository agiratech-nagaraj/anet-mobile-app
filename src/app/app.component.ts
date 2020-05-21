import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {clearProjects, loadProjectss} from './store/projects/actions/projects.actions';
import {clearActivities, loadActivitess} from './store/activites/actions/activites.actions';
import * as appStore from './store/reducers';
import {ApiService} from './core/api.service';
import {StorageKeys, StorageService} from './storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  islogin = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<appStore.State>,
    private router: Router,
    private api: ApiService
  ) {
    this.initializeApp();
    this.islogin = !!StorageService.instance.getItem(StorageKeys.auth);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#208590');
      this.splashScreen.hide();
    });
  }

  refresh() {
    this.loadStates();
  }

  signOut() {
    this.api.signOut().subscribe((res) => {
      if (res.success) {
        localStorage.clear();
        this.resetStates();
        this.router.navigateByUrl('/sign_in');
      }
    });
  }

  private loadStates() {
    this.store.dispatch(loadProjectss());
    this.store.dispatch(loadActivitess());
  }

  private resetStates() {
    this.store.dispatch(clearProjects());
    this.store.dispatch(clearActivities());
  }

}
