import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {DatePipe} from '@angular/common';

import {select, Store} from '@ngrx/store';

import {ActionSheetController} from '@ionic/angular';

import {ApiService} from '../../core/api.service';
import {AlertService} from '../../core/alert.service';
import {WorkFromHome} from '../../core/models/http/responses/wfh-list.response';
import * as appStore from '../../store/reducers';
import {selectWFHListState} from '../../store/wfh/selectors/wfh.selectors';
import {loadWFHs} from '../../store/wfh/actions/wfh.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-applied-wfh',
  templateUrl: './applied-wfh.page.html',
  styleUrls: ['./applied-wfh.page.scss'],
})
export class AppliedWfhPage implements OnInit {

  appliedWFHList$: Observable<WorkFromHome[]> = of([]);
  pageNo = 1;
  actions = [{
    text: 'Delete',
    role: 'destructive',
    icon: 'trash',
    handler: () => {
      this.removeAppliedWFH();
    }
  }, {
    text: 'Cancel',
    icon: 'close',
    role: 'cancel',
    handler: () => {
      this.selectedWFH = null;
    }
  }];
  updateAction = {
    text: 'Update',
    icon: 'create-outline',
    role: 'update',
    handler: () => {
      this.updateAppliedWFH();
    }
  };

  selectedWFH: WorkFromHome;

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
    this.loadAppliedWFH();
  }

  loadAppliedWFH() {
    this.appliedWFHList$ = this.store.pipe(select(selectWFHListState));
  }

  refresh(event) {
    setTimeout(() => {
      this.reload();
      event.target.complete();
    }, 2000);
  }

  async presentActionSheet(selectedWFH: WorkFromHome) {

    const actions = this.isWFHAppliedToday(selectedWFH) ? [...this.actions, this.updateAction] : this.actions;
    const actionSheet = await this.actionSheetController.create({
      header: 'WFH',
      cssClass: 'my-custom-class',
      buttons: actions
    });
    this.selectedWFH = selectedWFH;
    await actionSheet.present();

  }

  isWFHAppliedToday(selectedWFH: WorkFromHome): boolean {
    const today = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    const wfhDate = this.datePipe.transform(selectedWFH?.date, 'dd/MM/yyyy');
    return wfhDate === today;
  }

  private updateAppliedWFH() {
    if (!this.selectedWFH) {
      return;
    }
    this.api.getAppliedWFH(this.selectedWFH?.id).subscribe((res) => {
      if (res?.success) {
        this.selectedWFH = null;
        this.router.navigateByUrl('/tabs/wfh', {
          state: {data: res?.result}
        });
      }
    });
  }

  private removeAppliedWFH() {
    if (!this.selectedWFH) {
      return;
    }
    this.api.deleteAppliedWFH(this.selectedWFH?.id).subscribe((res) => {
      if (res?.success) {
        this.selectedWFH = null;
        this.alertService.toastAlert(res?.message, 'Info');
        this.reload();
      }
    });
  }

  private reload() {
    this.store.dispatch(loadWFHs({pageNo: 1, thisMonth: true}));
  }

}
