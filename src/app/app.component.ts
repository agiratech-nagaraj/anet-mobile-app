import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';

import {LoadingController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AndroidFullScreen} from '@ionic-native/android-full-screen/ngx';

import {clearProjects, loadProjectss} from './store/projects/actions/projects.actions';
import {clearActivities, loadActivitess} from './store/activites/actions/activites.actions';
import * as appStore from './store/reducers';
import {ApiService} from './core/api.service';
import {AlertService} from './core/alert.service';
import {selectUserState} from './store/user/selectors/user.selectors';
import {clearUsers, loadUsers} from './store/user/actions/user.actions';
import {StorageKeys, StorageService} from './storage';
import {SignInResponse} from './core/models/http/responses/sign-in.response';
import {clearWFH, loadWFHs} from './store/wfh/actions/wfh.actions';
import {clearTimesheets, loadTimesheetss} from './store/timesheets/actions/timesheets.actions';

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
    private api: ApiService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    public androidFullScreen: AndroidFullScreen,
  ) {
    this.initializeApp();
    const userData: SignInResponse = StorageService.instance.getItem(StorageKeys.userData, true);
    this.store.dispatch(loadUsers({data: userData?.data}));
    this.userStateListener();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#208590');
      this.splashScreen.hide();
      this.switchToFullScreen();
    });
  }

  refresh() {
    this.loadStates();
  }

  async signOut() {
    const loaderRef = await this.alertService.presentLoading();
    this.api.signOut().subscribe((res) => {
      loaderRef.dismiss();
      if (res?.success) {
        localStorage.clear();
        this.resetStates();
        this.islogin = false;
        this.router.navigateByUrl('/sign-in');
      } else {
        const message = JSON.stringify(res?.errors ?? 'Something went wrong', null, 2);
        this.alertService.toastAlert(message);
      }
    });
  }

  private loadStates() {
    this.store.dispatch(loadProjectss());
    this.store.dispatch(loadActivitess());
    this.store.dispatch(loadWFHs({pageNo: 1, thisMonth: true}));
    this.store.dispatch(loadTimesheetss({pageNo: 1, duration: 'this month'}));
  }

  private resetStates() {
    this.store.dispatch(clearProjects());
    this.store.dispatch(clearActivities());
    this.store.dispatch(clearTimesheets());
    this.store.dispatch(clearWFH());
    this.store.dispatch(clearUsers());
  }

  private userStateListener() {
    this.store.pipe(select(selectUserState)).subscribe((state) => {
      this.islogin = !!state?.data;
      if (this.islogin) {
        this.loadStates();
      }
    });
  }

  switchToFullScreen() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => {
        this.androidFullScreen.immersiveMode();
      })
      .catch(err => console.log(err));
  }

}
