import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

import {select, Store} from '@ngrx/store';

import {NavController, ToastController} from '@ionic/angular';

import {AlertService} from '../../core/alert.service';
import {ApiService} from '../../core/api.service';
import * as appStore from '../../store/reducers';
import {selectActivitiesListState} from '../../store/activites/selectors/activites.selectors';
import {selectProjectListState} from '../../store/projects/selectors/projects.selectors';
import * as projectsListRes from '../../core/models/http/responses/projects-list.response';
import * as activitiesListRes from '../../core/models/http/responses/activities-list.response';
import {StorageKeys, StorageService} from '../../storage';
import {TimesheetPayload} from '../../core/models/http/payloads/timesheet.payload';
import {Timesheet} from '../../core/models/http/responses/timesheet.response';

@Component({
  selector: 'app-log-time',
  templateUrl: './log-time.page.html',
  styleUrls: ['./log-time.page.scss'],
})
export class LogTimePage implements OnInit {

  errorMessages = {
    project_id: [
      {type: 'required', message: 'Project is required.'},
    ],
    activity_id: [
      {type: 'required', message: 'Activity is required.'},
    ],
    billed_hours: [
      {type: 'required', message: 'Billing Hours is required.'},
      {type: 'pattern', message: 'Please enter a billing hours'}
    ],
    worked_hours: [
      {type: 'required', message: 'Working hours is required'},
      {type: 'pattern', message: 'Please enter a working hours'}
    ],
    comment: [
      {type: 'required', message: 'comment is required.'},
    ],
    date: [
      {type: 'required', message: 'date is no match.'},
    ]
  };

  public timeSheetForm: FormGroup;
  public projects$: Observable<projectsListRes.Result[]> = of([]);
  public activities$: Observable<activitiesListRes.Result[]> = of([]);

  // tslint:disable-next-line:variable-name
  private _cacheLogTimePayload: TimesheetPayload;

  private set cacheLogTimePayload(payload: TimesheetPayload) {
    StorageService.instance.setItem(StorageKeys.lastTimeSheetData, payload, true);
    this._cacheLogTimePayload = payload;
  }

  private get cacheLogTimePayload(): TimesheetPayload {
    if (this._cacheLogTimePayload) {
      return this._cacheLogTimePayload;
    }
    this._cacheLogTimePayload = StorageService.instance.getItem(StorageKeys.lastTimeSheetData, true);
    return this._cacheLogTimePayload;
  }

  selectedTimeSheet: Timesheet;


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastController,
    private nav: NavController,
    private alertService: AlertService,
    private apiService: ApiService,
    private store: Store<appStore.State>,
  ) {

  }

  ngOnInit(): void {
    this.loadStates();
    const updateData = history.state?.data;
    this.selectedTimeSheet = updateData;
    const lastLogPayload = updateData || this.cacheLogTimePayload;

    this.timeSheetForm = this.formBuilder.group({

      project_id: new FormControl(lastLogPayload?.project_id ?? '', Validators.compose([
        Validators.required
      ])),

      activity_id: new FormControl(lastLogPayload?.activity_id ?? '', Validators.compose([
        Validators.required,
      ])),

      worked_hours: new FormControl(lastLogPayload?.worked_hours ?? '8', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{1,2})$'),
      ])),

      billed_hours: new FormControl(lastLogPayload?.billed_hours ?? '', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{1,2})$'),
      ])),

      comment: new FormControl(lastLogPayload?.comment ?? '', Validators.compose([
        Validators.required,
      ])),

      date: new FormControl(updateData?.date ?? new Date().toString(), Validators.compose([
        Validators.required
      ]))
    });
  }

  ionViewWillEnter() {
    this.setFormForUpdateLogTime();
  }

  async submit() {

    if (!this.timeSheetForm.valid) {
      await this.alertService.toastAlert('Enter valid details');
      return;
    }

    const loaderRef = await this.alertService.presentLoading();

    if (this.selectedTimeSheet) {
      this.updateTimeSheet(this.timeSheetForm?.value, loaderRef);
    } else {
      this.addTimeSheet(this.timeSheetForm?.value, loaderRef);
    }

  }

  private loadStates() {
    this.projects$ = this.store.pipe(select(selectProjectListState));
    this.activities$ = this.store.pipe(select(selectActivitiesListState));
  }

  private addTimeSheet(payload, loaderRef) {
    this.apiService.addTimeSheet(payload)
      .subscribe(async (res) => {
        loaderRef.dismiss();
        if (res?.success) {
          this.cacheLogTimePayload = this.timeSheetForm.value;
          await this.alertService.toastAlert('Added Successfully', 'Info');
        } else {
          const message = JSON.stringify(res?.errors ?? 'Something went wrong', null, 2);
          this.alertService.toastAlert(message);
        }
      });
  }

  private updateTimeSheet(payload, loaderRef) {
    this.apiService.updateTimeSheet(this.selectedTimeSheet?.id, payload)
      .subscribe(async (res) => {
        loaderRef.dismiss();
        if (res?.success) {
          this.selectedTimeSheet = null;
          history.state.data = null;
          this.timeSheetForm.reset();
          await this.alertService.toastAlert(res?.message, 'Info');
        } else {
          const message = JSON.stringify(res?.errors ?? 'Something went wrong', null, 2);
          this.alertService.toastAlert(message);
        }
      });
  }


  private setFormForUpdateLogTime() {

    const updateData = history.state?.data;
    if (!updateData || this.selectedTimeSheet) {
      return;
    }
    this.selectedTimeSheet = updateData;
    console.log('selected time sheet', updateData);
    this.timeSheetForm.reset();
    this.timeSheetForm.controls.project_id.setValue(this.selectedTimeSheet?.project?.id);
    this.timeSheetForm.controls.activity_id.setValue(this.selectedTimeSheet?.activity?.id);
    this.timeSheetForm.controls.date.setValue(this.selectedTimeSheet?.date);
    this.timeSheetForm.controls.comment.setValue(this.selectedTimeSheet?.comment);
    this.timeSheetForm.controls.billed_hours.setValue(this.selectedTimeSheet?.billed_hours);
    this.timeSheetForm.controls.worked_hours.setValue(this.selectedTimeSheet?.worked_hours);

  }
}
