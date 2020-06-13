import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ActionSheetController} from '@ionic/angular';

import {select, Store} from '@ngrx/store';

import {ApiService} from '../../core/api.service';
import {AlertService} from '../../core/alert.service';
import {Timesheet} from '../../core/models/http/responses/timesheets.response';
import * as appStore from '../../store/reducers';
import {
  selectTimesheetsCountState,
  selectTimesheetsListState, selectTimesheetsLoader
} from '../../store/timesheets/selectors/timesheets.selectors';
import {loadTimesheetss} from '../../store/timesheets/actions/timesheets.actions';

@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.page.html',
  styleUrls: ['./time-sheets.page.scss'],
})
export class TimeSheetsPage implements OnInit, OnDestroy {

  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

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
  totalTimeSheets: number;
  isRefreshing = false;
  timeSheetsLoading$;
  selectedMonth = 'this month';

  private unSubscribe = new Subject();

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
    this.timeSheetsLoading$ = this.store.pipe(select(selectTimesheetsLoader));
  }


  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }


  refresh(event) {
    this.isRefreshing = true;
    this.reload();
    setTimeout(() => {
      this.isRefreshing = false;
      event.target.complete();
    }, 500);
  }

  async presentActionSheet(selectedTimeSheet: Timesheet) {

    if (!this.isTimeSheetApplicableForModify(selectedTimeSheet)) {
      this.alertService.toastAlert('You are not authorized to do modify this', 'Error');
      return;
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Time Sheets',
      cssClass: 'my-custom-class',
      buttons: this.actions
    });

    this.selectedTimeSheet = selectedTimeSheet;
    await actionSheet.present();

  }

  selectMonth(selectedMonth: string) {
    this.selectedMonth = selectedMonth;
    this.store.dispatch(loadTimesheetss({pageNo: 1, duration: selectedMonth}));
  }


  loadMore(event) {
    // if (this.totalTimeSheets && this.pageNo > (this.totalTimeSheets / 10)) {
    //   this.infiniteScroll.disabled = true;
    //   return;
    // }
    // this.pageNo += 1;
    // this.store.dispatch(loadTimesheetss({pageNo: this.pageNo, duration: 'this month'}));
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  private loadTimeSheet() {
    this.timeSheets$ = this.store.pipe(select(selectTimesheetsListState));
    this.store.pipe(select(selectTimesheetsCountState), takeUntil(this.unSubscribe)).subscribe((count) => {
      this.totalTimeSheets = count;
    });
  }


  private isTimeSheetApplicableForModify(selectedTimeSheet: Timesheet): boolean {

    const currentDate = new Date().getDate();
    const currentDateIns = new Date();

    const today = this.datePipe.transform(currentDateIns, 'dd/MM/yyyy');
    const yesterday = this.datePipe.transform(currentDateIns.setDate(currentDate - 1), 'dd/MM/yyyy');
    const dayBeforeYesterday = this.datePipe.transform(currentDateIns.setDate(currentDate - 2), 'dd/MM/yyyy');
    const last3rdDay = this.datePipe.transform(currentDateIns.setDate(currentDate - 3), 'dd/MM/yyyy');
    const timeSheetDate = this.datePipe.transform(selectedTimeSheet?.date, 'dd/MM/yyyy');

    return timeSheetDate === today || timeSheetDate === yesterday || timeSheetDate === dayBeforeYesterday || timeSheetDate === last3rdDay;

  }

  private reload() {
    this.store.dispatch(loadTimesheetss({pageNo: 1, duration: this.selectedMonth}));
    // this.infiniteScroll.disabled = false;
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
    this.api.getTimeSheet(this.selectedTimeSheet?.id).subscribe((res) => {
      if (res?.success) {
        this.selectedTimeSheet = null;
        if (!res.result) {
          this.alertService.toastAlert(res?.message, 'Info');
          return;
        }
        this.router.navigateByUrl('/tabs/logtime', {
          state: {data: res?.result}
        });
      }
    });
  }

}
