import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

import {ActionSheetController} from '@ionic/angular';

import {select, Store} from '@ngrx/store';

import {ApiService} from '../../core/api.service';
import {AlertService} from '../../core/alert.service';
import {Timesheet} from '../../core/models/http/responses/timesheet.response';
import * as appStore from '../../store/reducers';
import {selectTimesheetsListState} from '../../store/timesheets/selectors/timesheets.selectors';
import {loadTimesheetss} from '../../store/timesheets/actions/timesheets.actions';

@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.page.html',
  styleUrls: ['./time-sheets.page.scss'],
})
export class TimeSheetsPage implements OnInit {

  timeSheets$: Observable<Timesheet[]> = of([]);
  pageNo = 1;
  duration = 'this month';
  actions = [{
    text: 'Delete',
    role: 'destructive',
    icon: 'trash',
    handler: () => {
      this.removeAppliedTimeSheet();
    }
  }, {
    text: 'Cancel',
    icon: 'close',
    role: 'cancel',
    handler: () => {
      this.selectedTimeSheet = null;
    }
  },
    {
      text: 'Update',
      icon: 'create-outline',
      role: 'update',
      handler: () => {
        this.updateAppliedTimeSheet();
      }
    }
  ];


  selectedTimeSheet: Timesheet;

  constructor(
    private api: ApiService,
    private alertService: AlertService,
    private store: Store<appStore.State>,
    public actionSheetController: ActionSheetController,
    private datePipe: DatePipe,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loadTimeSheet();
  }

  private loadTimeSheet() {
    this.timeSheets$ = this.store.pipe(select(selectTimesheetsListState));
  }

  refresh(event) {
    setTimeout(() => {
      this.reload();
      event.target.complete();
    }, 1000);
  }

  async presentActionSheet(selectedTimeSheet: Timesheet) {

    if (!this.isTimeSheetApplicableForModify(selectedTimeSheet)) {
      this.alertService.toastAlert('You are not authorized to do modify this', 'Error');
      return;
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'WFH',
      cssClass: 'my-custom-class',
      buttons: this.actions
    });

    this.selectedTimeSheet = selectedTimeSheet;
    await actionSheet.present();

  }

  isTimeSheetApplicableForModify(selectedTimeSheet: Timesheet): boolean {
    const today = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    const yesterday = this.datePipe.transform(new Date(new Date().setDate(new Date().getDate() - 1)), 'dd/MM/yyyy');
    const dayBeforeYesterday = this.datePipe.transform(new Date(new Date().setDate(new Date().getDate() - 2)), 'dd/MM/yyyy');
    const timeSheetDate = this.datePipe.transform(selectedTimeSheet?.date, 'dd/MM/yyyy');
    return timeSheetDate == today || timeSheetDate == yesterday || timeSheetDate == dayBeforeYesterday;
  }

  private reload() {
    this.store.dispatch(loadTimesheetss({pageNo: 1, duration: 'this month'}));
  }

  private removeAppliedTimeSheet() {
    if (!this.selectedTimeSheet) {
      return;
    }
    this.api.deleteTimeSheet(this.selectedTimeSheet?.id).subscribe((res) => {
      if (res?.success) {
        this.selectedTimeSheet = null;
        this.alertService.toastAlert(res?.message, 'Info');
        this.reload();
      }
    });
  }

  private updateAppliedTimeSheet() {
    if (!this.selectedTimeSheet) {
      return;
    }
    this.api.getAppliedWFH(this.selectedTimeSheet?.id).subscribe((res) => {
      if (res?.success) {
          this.selectedTimeSheet = null;
          this.router.navigateByUrl('/tabs/logtime', {
          state: {data: res?.result}
        });
      }
    });
  }

}
