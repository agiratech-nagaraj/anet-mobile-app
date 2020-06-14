import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import * as HighCharts from 'highcharts';

import {select, Store} from '@ngrx/store';

import * as appStore from '../../store/reducers';
import {selectChartsResultState} from '../../store/charts/charts.selectors';
import {loadChartss} from '../../store/charts/charts.actions';
import {ChartsResult} from '../../core/models/http/responses/charts.response';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {


  chartsData: ChartsResult;
  selectedMonth = 'this month';


  // Working hrs is coming as 0 so computing from bardata
  // tslint:disable-next-line:variable-name
  private _workedHrs: any;

  set workedHrs(value: any) {

    this._workedHrs = this.chartsData?.bar_data?.filter((data) => data.name === 'worked')
      .map(workedHrs => workedHrs.data.reduce((prevData, nxtData, i) => prevData + nxtData))
      .join() ?? '';

  }

  get workedHrs(): any {
    return this._workedHrs;
  }

  private unSubscribe = new Subject();

  constructor(
    private store: Store<appStore.State>,
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  ionViewDidEnter() {
    this.store.pipe(select(selectChartsResultState), takeUntil(this.unSubscribe)).subscribe((result) => {
      if (!result) {
        return;
      }
      this.chartsData = result;
      this.workedHrs = result;
      this.plotDateVsTimeChart();
    });
  }

  selectMonth(selectedMonth: string) {
    this.selectedMonth = selectedMonth;
    this.loadData();
  }

  private loadData() {
    this.store.dispatch(loadChartss({payload: {duration: this.selectedMonth}}));
  }

  private plotDateVsTimeChart() {
    HighCharts.chart('date-vs-time' as string, {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Date vs Total Time Spent'
      },
      xAxis: {
        categories: this.chartsData.duration
      },
      yAxis: {
        title: {
          text: 'Hours'
        }
      },
      series: this.chartsData.bar_data
    } as any, (event) => {
    });
  }

}
