import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

import {select, Store} from '@ngrx/store';

import {NavController, ToastController} from '@ionic/angular';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';

import {AlertService} from '../../core/providers/alert.service';
import {ApiService} from '../../core/providers/api.service';
import * as appStore from '../../store/reducers';
import {selectActivitiesListState, selectActivitiesLoader} from '../../store/activites/selectors/activites.selectors';
import {selectProjectListState, selectProjectsLoader} from '../../store/projects/selectors/projects.selectors';
import * as projectsListRes from '../../core/models/http/responses/projects-list.response';
import * as activitiesListRes from '../../core/models/http/responses/activities-list.response';
import {StorageKeys, StorageService} from '../../storage';
import {TimesheetPayload} from '../../core/models/http/payloads/timesheet.payload';
import {Timesheet} from '../../core/models/http/responses/timesheets.response';
import {loadTimesheetss} from '../../store/timesheets/actions/timesheets.actions';


@Component({
  selector: 'app-log-time',
  templateUrl: './log-time.page.html',
  styleUrls: ['./log-time.page.scss'],
})
export class LogTimePage implements OnInit {

  isRecording = true;
  errorMessages = {
    project_id: [
      {type: 'required', message: 'Project is required.'},
    ],
    activity_id: [
      {type: 'required', message: 'Activity is required.'},
    ],
    billed_hours: [],
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
  public projectsLoading$;
  public activitiesLoading$;

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
    private speechRecognition: SpeechRecognition,
  ) {
  }

  ngOnInit(): void {
    this.loadStates();
    const updateData = history.state?.data;
    this.selectedTimeSheet = updateData;
    const lastLogPayload = updateData || this.cacheLogTimePayload;
    this.projectsLoading$ = this.store.pipe(select(selectProjectsLoader));
    this.activitiesLoading$ = this.store.pipe(select(selectActivitiesLoader));

    this.timeSheetForm = this.formBuilder.group({

      project_id: new FormControl(lastLogPayload?.project?.id || lastLogPayload?.project_id || '', Validators.compose([
        Validators.required
      ])),

      activity_id: new FormControl(lastLogPayload?.activity?.id || lastLogPayload?.activity_id || '', Validators.compose([
        Validators.required,
      ])),

      worked_hours: new FormControl(lastLogPayload?.worked_hours ?? '8', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{1,2})$'),
      ])),

      billed_hours: new FormControl(lastLogPayload?.billed_hours ?? '', []),

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

  reset() {
    this.timeSheetForm.reset();
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
          await this.alertService.toastAlert('Added Successfully', 'Info');
          this.cacheLogTimePayload = this.timeSheetForm.value;
          this.loadTimeSheets();
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
          await this.alertService.toastAlert(res?.message, 'Info');
          this.selectedTimeSheet = null;
          history.state.data = null;
          this.timeSheetForm.reset();
          this.loadTimeSheets();
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
    this.timeSheetForm.reset();
    this.timeSheetForm.controls.project_id.setValue(this.selectedTimeSheet?.project?.id);
    this.timeSheetForm.controls.activity_id.setValue(this.selectedTimeSheet?.activity?.id);
    this.timeSheetForm.controls.date.setValue(this.selectedTimeSheet?.date);
    this.timeSheetForm.controls.comment.setValue(this.selectedTimeSheet?.comment);
    this.timeSheetForm.controls.billed_hours.setValue(this.selectedTimeSheet?.billed_hours);
    this.timeSheetForm.controls.worked_hours.setValue(this.selectedTimeSheet?.worked_hours);

  }

  private loadTimeSheets() {
    this.store.dispatch(loadTimesheetss({pageNo: 1, duration: 'this month'}));
  }

  stopSpeechListener($event: MouseEvent) {
    this.isRecording = true;
    this.speechRecognition.stopListening();
  }

  async startSpeechListener($event: MouseEvent) {

    const available = await this.speechRecognition.isRecognitionAvailable();
    if (!available) {
      this.alertService.toastAlert('No platform supprot');
      return;
    }

    const hasPermission = await this.speechRecognition.hasPermission();
    if (hasPermission) {
      this.listenSpeechAPI();
    } else {
      this.speechRecognition.requestPermission().then(this.listenSpeechAPI.bind(this));
    }
  }

  private listenSpeechAPI() {
    this.isRecording = false;
    setTimeout(()=> this.isRecording = true, 15000) // max time listening
    this.speechRecognition.startListening({
      language: 'en-IN',
      prompt: 'Say Comments',
      showPopup: false,
      showPartial: false
    }).subscribe(matches => {
      this.isRecording = true;
      if (Array.isArray(matches) && matches.length > 0) {
        const currentVal = this.timeSheetForm.controls.comment.value;
        this.timeSheetForm.controls.comment.setValue(currentVal+ ' '+ matches[0] ?? '');
      }
    });
  }
}
