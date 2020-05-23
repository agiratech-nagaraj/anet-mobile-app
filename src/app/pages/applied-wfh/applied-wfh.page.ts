import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';

import {select, Store} from '@ngrx/store';

import {ApiService} from '../../core/api.service';
import {AlertService} from '../../core/alert.service';
import {WorkFromHome} from '../../core/models/http/responses/wfh-list.response';
import * as appStore from '../../store/reducers';
import {selectWFHListState} from '../../store/wfh/selectors/wfh.selectors';

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


}
