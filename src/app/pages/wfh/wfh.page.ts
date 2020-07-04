import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DatePipe} from '@angular/common';

import {select, Store} from '@ngrx/store';

import {NavController, ToastController} from '@ionic/angular';

import * as projectsListRes from '../../core/models/http/responses/projects-list.response';
import * as appStore from '../../store/reducers';
import {selectProjectListState, selectProjectsLoader} from '../../store/projects/selectors/projects.selectors';
import {AlertService} from '../../core/providers/alert.service';
import {ApiService} from '../../core/providers/api.service';
import {StorageKeys, StorageService} from '../../storage';
import { WorkFromHome} from '../../core/models/http/payloads/wfh.payload';
import * as wfhList from '../../core/models/http/responses/wfh-list.response';
import * as WfhRecordResponse from '../../core/models/http/responses/wfh-record.response';
import {loadWFHs} from '../../store/wfh/actions/wfh.actions';


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

  public wfhForm: FormGroup;
  public projects$: Observable<projectsListRes.Result[]> = of([]);
  public projectsLoading$;
  // tslint:disable-next-line:variable-name
  private _cacheWFHPayload: WorkFromHome;

  private set cacheWFHPayload(payload: WorkFromHome) {
    StorageService.instance.setItem(StorageKeys.lastWFHData, payload, true);
    this._cacheWFHPayload = payload;
  }

  private get cacheWFHPayload(): WorkFromHome {
    if (this._cacheWFHPayload) {
      return this._cacheWFHPayload;
    }
    this._cacheWFHPayload = StorageService.instance.getItem(StorageKeys.lastWFHData, true);
    return this._cacheWFHPayload;
  }

  selectedWFH: WfhRecordResponse.Result;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastController,
    private nav: NavController,
    private store: Store<appStore.State>,
    private alertService: AlertService,
    private apiService: ApiService,
    private datePipe: DatePipe,
  ) {

  }

  ngOnInit(): void {


    const updateData = history.state?.data;
    this.selectedWFH = updateData as wfhList.WorkFromHome;
    const initialData = updateData || this.cacheWFHPayload;
    this.projectsLoading$ = this.store.pipe(select(selectProjectsLoader));

    this.wfhForm = this.formBuilder.group({

      project_id: new FormControl(initialData?.project_id ?? '', Validators.compose([
        Validators.required,
      ])),

      billable: new FormControl(initialData?.billable?.toString() ?? '', Validators.compose([
        Validators.required,
      ])),

      from_time: new FormControl(initialData?.from_time ?? '10:00', Validators.compose([
        Validators.required,
      ])),

      // for the email requrire
      to_time: new FormControl(initialData?.to_time ?? '20:00', Validators.compose([
        Validators.required,
      ])),

      reason: new FormControl(initialData?.reason ?? '', Validators.compose([
        Validators.required,
      ])),

      date: new FormControl(this.selectedWFH ? initialData?.date : new Date().toString(), Validators.compose([
        Validators.required
      ]))
    });
    this.loadStates();
  }

  ionViewWillEnter() {
    this.setFormForUpdateWFH();
  }

  async submit() {

    if (!this.wfhForm.valid) {
      this.alertService.toastAlert('Enter valid details');
      return;
    }

    const loaderRef = await this.alertService.presentLoading();

    let payload = {...this.wfhForm.value};
    const date = this.datePipe.transform(new Date(payload.date), 'yyyy-MM-dd');
    payload = {...payload, date};
    if (this.selectedWFH) {
      this.updateWFH(payload, loaderRef);
    } else {
      this.addWFH(payload, loaderRef);
    }

  }


  private loadStates() {
    this.projects$ = this.store.pipe(select(selectProjectListState));
  }

  private addWFH(payload, loaderRef) {
    this.apiService.addWFH(payload)
      .subscribe(async (res) => {
        loaderRef.dismiss();
        if (res?.success) {
          await this.alertService.toastAlert('Added Successfully', 'Info');
          this.cacheWFHPayload = this.wfhForm?.value;
          this.reload();
        } else {
          const message = JSON.stringify(res?.errors ?? 'Something went wrong', null, 2);
          this.alertService.toastAlert(message);
        }
      });
  }

  private updateWFH(payload, loaderRef) {
    this.apiService.updateAppliedWFH(this.selectedWFH.id, payload)
      .subscribe(async (res) => {
        loaderRef.dismiss();
        if (res?.success) {
          await this.alertService.toastAlert('Updated Successfully', 'Info');
          this.wfhForm.reset();
          this.selectedWFH = null;
          history.state.data = null;
          this.reload();
        } else {
          const message = JSON.stringify(res?.errors ?? 'Something went wrong', null, 2);
          this.alertService.toastAlert(message);
        }
      });
  }

  private setFormForUpdateWFH() {
    const updateData = history.state?.data;
    if (!updateData || this.selectedWFH) {
      return;
    }
    this.selectedWFH = updateData as wfhList.WorkFromHome;
    this.wfhForm.reset();
    this.wfhForm.controls.project_id.setValue(this.selectedWFH?.project_id);
    this.wfhForm.controls.date.setValue(this.selectedWFH?.date);
    this.wfhForm.controls.from_time.setValue(this.selectedWFH?.from_time);
    this.wfhForm.controls.to_time.setValue(this.selectedWFH?.to_time);
    this.wfhForm.controls.reason.setValue(this.selectedWFH?.reason);
    this.wfhForm.controls.billable.setValue(this.selectedWFH?.billable?.toString());
  }

  private reload() {
    this.store.dispatch(loadWFHs({pageNo: 1, thisMonth: true}));
  }

}
