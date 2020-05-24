import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';

import {select, Store} from '@ngrx/store';

import {ApiService} from '../../core/api.service';
import {AlertService} from '../../core/alert.service';
import {WorkFromHome} from '../../core/models/http/responses/wfh-list.response';
import * as appStore from '../../store/reducers';
import {selectWFHListState} from '../../store/wfh/selectors/wfh.selectors';
import {loadTimesheetss} from "../../store/timesheets/actions/timesheets.actions";
import {loadWFHs} from "../../store/wfh/actions/wfh.actions";

@Component({
  selector: 'app-applied-wfh',
  templateUrl: './applied-wfh.page.html',
  styleUrls: ['./applied-wfh.page.scss'],
})
export class AppliedWfhPage implements OnInit {

  appliedWFHList$: Observable<WorkFromHome[]> = of([]);
  pageNo = 1;

  constructor(
    private api: ApiService,
    private alertService: AlertService,
    private store: Store<appStore.State>,
  ) {
  }

  ngOnInit() {
    this.loadAppliedWFH();
  }

  loadAppliedWFH() {
    this.appliedWFHList$ = this.store.pipe(select(selectWFHListState));
  }

  reload(event) {
    this.store.dispatch(loadWFHs({pageNo: 1, thisMonth: true}));
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
