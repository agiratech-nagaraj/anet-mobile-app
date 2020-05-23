import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/api.service';
import {AlertService} from '../../core/alert.service';
import {WorkFromHome} from '../../core/models/http/responses/wfh-list.response';

@Component({
  selector: 'app-applied-wfh',
  templateUrl: './applied-wfh.page.html',
  styleUrls: ['./applied-wfh.page.scss'],
})
export class AppliedWfhPage implements OnInit {

  appliedWFHList: WorkFromHome[] = [];
  pageNo = 1;

  constructor(
    private api: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadAppliedWFH();
  }

  loadAppliedWFH() {

    this.api.getWFHList(this.pageNo, true)
      .subscribe((res) => {
        if (res?.result) {
          this.appliedWFHList = res?.result?.work_from_homes ?? [];
        } else {
          this.alertService.toastAlert(res?.errors ?? 'Something went wrong' );
        }
      });

  }


}
