import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {NavController, ToastController} from '@ionic/angular';

import {AlertService} from '../../core/alert.service';
import {ApiService} from '../../core/api.service';

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
      {type: 'required', message: 'Email is required.'},
    ],
    billed_hours: [
      {type: 'required', message: 'password is required.'},
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

  public option: string;
  public timeSheetForm: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastController,
    private nav: NavController,
    private alert: AlertService,
    private api: ApiService,
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
  }

  async submit() {

    if (!this.timeSheetForm.valid) {
      await this.alert.toastAlert('Enter valid details');
      return;
    }

    this.api.addTimeSheet(this.timeSheetForm.value)
      .subscribe(async (res) => {
        if (res.success) {
          await this.alert.toastAlert('Success');
        }
      });
  }

  back() {
    this.nav.pop();
  }

}
