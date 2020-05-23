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


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastController,
    private nav: NavController,
    private alertService: AlertService,
    private apiService: ApiService,
    private store: Store<appStore.State>,
  ) {

    this.timeSheetForm = this.formBuilder.group({

      project_id: new FormControl('', Validators.compose([
        Validators.required
      ])),

      activity_id: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      worked_hours: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{1,2})$'),
      ])),

      billed_hours: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{1,2})$'),
      ])),

      comment: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      date: new FormControl(new Date().toString(), Validators.compose([
        Validators.required
      ]))
    });

  }

  ngOnInit() {
    this.loadStates();
  }

  async submit() {

    if (!this.timeSheetForm.valid) {
      await this.alertService.toastAlert('Enter valid details');
      return;
    }

    this.apiService.addTimeSheet(this.timeSheetForm.value)
      .subscribe(async (res) => {
        if (res?.success) {
          await this.alertService.toastAlert('Added Successfully', 'Info');
        } else {
          const message = JSON.stringify(res?.errors ?? 'Something went wrong', null, 2);
          this.alertService.toastAlert(message);
        }
      });
  }


  back() {
    this.nav.pop();
  }

  private loadStates() {
    this.projects$ = this.store.pipe(select(selectProjectListState));
    this.activities$ = this.store.pipe(select(selectActivitiesListState));
  }

}
