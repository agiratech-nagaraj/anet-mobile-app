import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';

import {Platform} from '@ionic/angular';
import {AndroidFullScreen} from '@ionic-native/android-full-screen/ngx';

import * as appStore from './store/reducers';
import {ApiService} from './core/providers/api.service';
import {AlertService} from './core/providers/alert.service';
import {selectUserState} from './store/user/selectors/user.selectors';
import { loadUsers} from './store/user/actions/user.actions';
import {StorageKeys, StorageService} from './storage';
import {SignInResponse, User} from './core/models/http/responses/sign-in.response';
import { loadWFHs} from './store/wfh/actions/wfh.actions';
import { loadTimesheetss} from './store/timesheets/actions/timesheets.actions';
import {AuthService} from './core/providers/auth.service';
import {initProjectss, loadProjectss} from './store/projects/actions/projects.actions';
import {initActivitess, loadActivitess} from './store/activites/actions/activites.actions';
import {environment} from '../environments/environment';

import {
  Plugins,
} from '@capacitor/core';
import {NotificationService} from "./core/providers/notification.service";

const { StatusBar, SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  islogin = false;
  user: User;
  apiURL = environment.url;

  constructor(
    private platform: Platform,
    private store: Store<appStore.State>,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
    public androidFullScreen: AndroidFullScreen,
    private authService: AuthService,
    private notification: NotificationService
  ) {
    this.initializeApp();
    const userData: SignInResponse = StorageService.instance.getItem(StorageKeys.userData, true);
    if (userData) {
      this.store.dispatch(loadUsers({data: userData?.data}));
    }
    this.userStateListener();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar?.setBackgroundColor?.({ color: '#3c8dbc'});
      SplashScreen?.hide?.();
      this.notification.checkPermissionAndRegister();
    });
  }

  refresh() {
    this.store.dispatch(loadProjectss());
    this.store.dispatch(loadActivitess());
    this.loadStates();
  }

  async signOut() {
    const loaderRef = await this.alertService.presentLoading();
    this.api.signOut().subscribe((res) => {
      loaderRef.dismiss();
      if (res?.success) {
        this.authService.clearSessionState();
        this.islogin = false;
        this.router.navigateByUrl('/sign-in');
      } else {
        const message = JSON.stringify(res?.errors ?? 'Something went wrong', null, 2);
        this.alertService.toastAlert(message);
      }
    });
  }

  private initProjectsAndActivitiesStates() {

    const projects = StorageService.instance.getItem(StorageKeys.cachedProjects, true);
    if (projects) {
      this.store.dispatch(initProjectss({data: projects}));
    } else {
      this.store.dispatch(loadProjectss());
    }

    const activities = StorageService.instance.getItem(StorageKeys.cachedActivites, true);
    if (activities) {
      this.store.dispatch(initActivitess({data: activities}));
    } else {
      this.store.dispatch(loadActivitess());
    }

  }

  private loadStates() {
    this.store.dispatch(loadWFHs({pageNo: 1, thisMonth: true}));
    this.store.dispatch(loadTimesheetss({pageNo: 1, duration: 'this month'}));
  }


  private userStateListener() {
    this.store.pipe(select(selectUserState)).subscribe((state) => {
      this.islogin = !!state?.data;
      if (this.islogin) {
        this.user = state.data;
        this.initProjectsAndActivitiesStates();
        this.loadStates();
      }
    });
  }

  private switchToFullScreen() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => {
        this.androidFullScreen.immersiveMode();
      })
      .catch(err => console.log(err));
  }

  private async registerLocalNotification(){

  }

}
