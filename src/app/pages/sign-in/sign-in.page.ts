import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import swal from 'sweetalert2';

import {IonInput, NavController} from '@ionic/angular';

import {Store} from '@ngrx/store';

import {ApiService} from '../../core/api.service';
import {SignInResponse} from '../../core/models/http/responses/sign-in.response';
import {StorageKeys, StorageService} from '../../storage';
import {Authentication} from '../../core/models/authentication';
import * as appStore from '../../store/reducers/index';
import {loadProjectss} from '../../store/projects/actions/projects.actions';
import {loadActivitess} from '../../store/activites/actions/activites.actions';
import {loadUsers} from '../../store/user/actions/user.actions';
import {AlertService} from '../../core/alert.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {


  public emailPasswordForm: FormGroup;

  errorMessages = {
    email: [
      {type: 'required', message: 'Email is required.'},
      {type: 'minLength', message: 'Email length must be longer or equal to 6 character.'},
      {type: 'maxLength', message: 'Email length must be lower or equal to 50 character.'},
      {type: 'pattern', message: 'Please enter a valid email'}
    ],
    password: [
      {type: 'required', message: 'password is required.'},
      {type: 'minLength', message: 'password length must be longer or equal to 6 character.'},
      {type: 'maxLength', message: 'password length must be lower or equal to 30 character.'},
      {type: 'pattern', message: 'Please enter a valid password'}
    ],
  };


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private nav: NavController,
    private api: ApiService,
    private store: Store<appStore.State>,
    private alertService: AlertService
  ) {
    this.emailPasswordForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
  }

  ngOnInit(): void {

  }

  showPassword(passowrdInputEl: IonInput) {
    passowrdInputEl.type = passowrdInputEl.type === 'password' ? 'text' : 'password';
  }

  async login() {

    const loaderRef = await this.alertService.presentLoading();
    this.api.signIn(this.emailPasswordForm.value)
      .subscribe((res: HttpResponse<SignInResponse>) => {
        loaderRef.dismiss();

        if (res.status !== 200) {
          swal('Login', res.statusText, 'error');
          return;
        }
        if (!!res.body.errors) {
          swal('Login', JSON.stringify(res?.body?.errors, null, 2), 'error');
        }
        this.signInSuccessResHandler(res);

      });

  }

  private signInSuccessResHandler(res: HttpResponse<SignInResponse>) {

    const auth: Authentication = {} as Authentication;
    auth.uid = res.headers.get('uid');
    auth.client = res.headers.get('client');
    auth['access-token'] = res.headers.get('access-token');
    StorageService.instance.setItem(StorageKeys.auth, auth, true);
    StorageService.instance.setItem(StorageKeys.userData, res.body, true);

    this.store.dispatch(loadUsers({data: res?.body?.data}));
    this.loadStates();
    this.router.navigateByUrl('/tabs');

  }

  private async loadStates() {
    this.store.dispatch(loadProjectss());
    this.store.dispatch(loadActivitess());
  }


}
