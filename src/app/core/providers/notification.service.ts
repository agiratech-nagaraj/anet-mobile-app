import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {concatMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

import {StorageKeys, StorageService} from '../../storage';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private config = {
    led: {color: '#3c8dbc', on: 500, off: 500},
    vibrate: true,
  };

  constructor(
    private localNotification: LocalNotifications,
    private datePipe: DatePipe,
    private apiService: ApiService,
  ) {
  }

  checkPermissionAndRegister() {
    this.localNotification.hasPermission().then((granted) => {
      if (granted) {
        this.register();
      } else {
        this.localNotification.requestPermission().then((reqGranted) => {
          if (reqGranted) {
            this.register();
          }
        });
      }
    });
  }

  register() {
    this.defineActions();
    this.wfhReminder();
    this.timeSheetReminder();
    this.listenWFHEvent();
  }

  defineActions() {
    this.localNotification.addActions('yes-no', [
      {id: 'yes', title: 'Yes'},
      {id: 'no', title: 'No'}
    ]);
  }

  notify({title, text}) {
    this.localNotification.schedule({
      ...this.config,
      text,
      title
    });
  }

  wfhReminder() {
    this.localNotification.schedule({
      ...this.config,
      title: 'APPLY WORK FROM HOME',
      text: 'Do you wanna apply the same time of yesterday?',
      actions: 'yes-no',
      trigger: {every: 'day', hour: 10, minute: 30} as any
    });
  }

  timeSheetReminder() {
    this.localNotification.schedule({
      ...this.config,
      title: 'APPLY TIME SHEET',
      trigger: {every: 'day', hour: 20, minute: 0} as any
    });
  }


  private listenWFHEvent() {
    this.localNotification.on('yes')
      .pipe(concatMap(notification => this.applyWithLastAppliedWorkFrom(notification)))
      .subscribe((response) => {
        this.handleWFHResponse(response);
      });
  }

  private applyWithLastAppliedWorkFrom(notification) {
    const lastWFHForm = StorageService.instance.getItem(StorageKeys.lastWFHData, true);
    if (lastWFHForm) {
      lastWFHForm.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      return this.apiService.addWFH(lastWFHForm);
    }
    return EMPTY;
  }

  private handleWFHResponse(response) {
    if (response?.success) {
      this.notify({text: 'SUCCESS', title: 'Applied work from home'});
    } else {
      this.notify({text: 'FAILURE', title: 'Applied work from home'});
    }
  }

}
