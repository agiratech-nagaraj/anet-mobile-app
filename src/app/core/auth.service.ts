import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {Store} from '@ngrx/store';

import {clearTimesheets} from '../store/timesheets/actions/timesheets.actions';
import {clearWFH} from '../store/wfh/actions/wfh.actions';
import {AlertService} from './alert.service';
import {clearActivities} from '../store/activites/actions/activites.actions';
import {StorageKeys, StorageService} from '../storage';
import {clearProjects} from '../store/projects/actions/projects.actions';
import {clearUsers} from '../store/user/actions/user.actions';
import * as appStore from '../store/reducers';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private store: Store<appStore.State>,
  ) {
  }

  clearSessionState() {
    this.resetLocalCache();
    this.resetStates();
  }

  resetLocalCache() {
    StorageService.instance.setItem(StorageKeys.auth, '');
    StorageService.instance.setItem(StorageKeys.userData, '');
    StorageService.instance.setItem(StorageKeys.lastWFHData, '');
    StorageService.instance.setItem(StorageKeys.lastTimeSheetData, '');
    StorageService.instance.setItem(StorageKeys.cachedActivites, '');
    StorageService.instance.setItem(StorageKeys.cachedProjects, '');
  }

  resetStates() {
    this.store.dispatch(clearProjects());
    this.store.dispatch(clearActivities());
    this.store.dispatch(clearTimesheets());
    this.store.dispatch(clearWFH());
    this.store.dispatch(clearUsers());
  }

}
