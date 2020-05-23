import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {NavController, ToastController} from '@ionic/angular';

import {toastEnter} from '../../shared/animations/toastAnimation/toast';
import {Observable, of} from 'rxjs';
import * as projectsListRes from '../../core/models/http/responses/projects-list.response';
import {select, Store} from '@ngrx/store';
import * as appStore from '../../store/reducers';
import {selectProjectListState} from '../../store/projects/selectors/projects.selectors';
import {selectActivitiesListState} from '../../store/activites/selectors/activites.selectors';
import {AlertService} from '../../core/alert.service';
import {ApiService} from '../../core/api.service';

@Component({
  selector: 'app-wfh',
  templateUrl: './wfh.page.html',
  styleUrls: ['./wfh.page.scss'],
})
export class WfhPage implements OnInit {


  errorMessages = {
    project_id: [
      {type: 'required', message: 'Project is required.'},
    ],
    billable: [
      {type: 'required', message: 'Billable is required.'},
    ],
    date: [
      {type: 'required', message: 'Date is no match.'},
    ],
    from_time: [
      {type: 'required', message: 'From time is required.'},
    ],
    to_time: [
      {type: 'required', message: 'To time is required.'},
    ],
    reason: [
      {type: 'required', message: 'Reason is no match.'},
    ],
  };

  public option: string;
  public wfhForm: FormGroup;
  public projects$: Observable<projectsListRes.Result[]> = of([]);


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastController,
    private nav: NavController,
    private store: Store<appStore.State>,
    private alertService: AlertService,
    private apiService: ApiService
  ) {

    this.wfhForm = this.formBuilder.group({

      project_id: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      billable: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      from_time: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      // for the email requrire
      to_time: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      reason: new FormControl('', Validators.compose([
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


  submit() {

    if (!this.wfhForm.valid) {
      this.alertService.toastAlert('Enter valid details');
      return;
    }

    this.apiService.addWFH(this.wfhForm.value)
      .subscribe(async (res) => {
        if (res?.success) {
          await this.alertService.toastAlert('Added Successfully');
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
  }

}
