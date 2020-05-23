import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../core/api.service';
import {AlertService} from '../../core/alert.service';
import {Timesheet} from '../../core/models/http/responses/timesheet.response';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as appStore from '../../store/reducers';
import {selectTimesheetsListState} from '../../store/timesheets/selectors/timesheets.selectors';

@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.page.html',
  styleUrls: ['./time-sheets.page.scss'],
})
export class TimeSheetsPage implements OnInit {

  timeSheets$: Observable<Timesheet[]> = of([]);
  pageNo = 1;
  duration = 'this month';

  constructor(
    private api: ApiService,
    private alertService: AlertService,
    private store: Store<appStore.State>
  ) {
  }

  ngOnInit() {
    this.loadTimeSheet();
  }

  private loadTimeSheet() {
    this.timeSheets$ = this.store.pipe(select(selectTimesheetsListState));
  }

}
