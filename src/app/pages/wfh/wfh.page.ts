import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {NavController, ToastController} from '@ionic/angular';

import {toastEnter} from '../../toastAnimation/toast';

@Component({
  selector: 'app-wfh',
  templateUrl: './wfh.page.html',
  styleUrls: ['./wfh.page.scss'],
})
export class WfhPage implements OnInit {


  error_messages = {
    project_id: [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid project'}
    ],
    billable: [
      {type: 'required', message: 'password is required.'},
      {type: 'pattern', message: 'Please enter a valid billable'}
    ],
    date: [
      {type: 'required', message: 'password is no match.'},
    ],
    from_time: [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid from time'}
    ],
    to_time: [
      {type: 'required', message: 'password is required.'},
      {type: 'pattern', message: 'Please enter a to time'}
    ],
    reason: [
      {type: 'required', message: 'password is no match.'},
    ],
  };

  public option: string;
  public wfhForm: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastController,
    private nav: NavController
  ) {

    this.wfhForm = this.formBuilder.group({

      project_id: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      billable: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(yes|no)$'),
      ])),

      from_time: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{1,2}:[0-9]{1,2}(am|pm))$'),
      ])),

      // for the email requrire
      to_time: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('^([0-9]{1,2})$'),
      ])),

      reason: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),

      date: new FormControl(new Date().toString(), Validators.compose([
        Validators.required
      ]))
    });

  }

  ngOnInit() {
  }

  submit() {
    this.register(this.wfhForm.value);
  }

  async register(userDetails) {
    if (userDetails.password !== userDetails.cpassword) {
      // showing the toast notification
      this.toastAlert();
    } else if (userDetails.password == userDetails.cpassword) {
      this.router.navigateByUrl('/tabs');
    }
  }

  async toastAlert() {
    const toast = await this.toast.create({
      header: 'Error',
      message: 'Hi, Your password don\'t match',
      duration: 400,
      position: 'top',
      enterAnimation: toastEnter,
    });
    toast.present();

  }

  back() {
    this.nav.pop();
  }


}
