import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../core/api.service';
import {AlertService} from '../../core/alert.service';
import {Timesheet} from '../../core/models/http/responses/timesheet.response';

@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.page.html',
  styleUrls: ['./time-sheets.page.scss'],
})
export class TimeSheetsPage implements OnInit {

  timeSheets: Timesheet[] = [];
  pageNo = 1;
  duration = 'this month';

  constructor(
    private api: ApiService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.loadTimeSheet();
  }

  private loadTimeSheet() {

    this.api.getTimeSheet(this.pageNo, this.duration)
      .subscribe((res) => {
        if (res?.success) {
          this.timeSheets = res?.result?.timesheets ?? [];
        } else {
          this.alertService.toastAlert(JSON.stringify(res?.errors ?? 'Something went wrong', null, 2) );
        }
      });

  }

}
