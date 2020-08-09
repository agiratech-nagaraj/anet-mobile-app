import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import * as HighCharts from 'highcharts';

import {select, Store} from '@ngrx/store';

import * as appStore from '../../store/reducers';
import {selectChartsResultState} from '../../store/charts/charts.selectors';
import {loadChartss} from '../../store/charts/charts.actions';
import {ChartsResult} from '../../core/models/http/responses/charts.response';

// tslint:disable-next-line:max-line-length

declare var Highcharts: any;

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
  timesheets: any;
  project_hours: any;

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
      this.plotTimeVsProjectChart();
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

  private plotTimeVsProjectChart() {

    HighCharts.chart('time-vs-projects' as string, {
      chart: {
        backgroundColor: '#fff',
        type: 'pie'
      },
      title: {
        text: 'User Vs Projects'
      },
      subtitle: {
        text: 'Total Hours: ' + this.chartsData.total_hours
      },
      yAxis: {
        title: {
          text: 'Total percent market share'
        }
      },
      plotOptions: {
        pie: {
          shadow: !1,
          center: ['50%', '50%']
        }
      },
      tooltip: {
        headerFormat: '<small>{point.key}</small></b><br/>',
        pointFormat: '{point.parent_name}: <b>{point.y}</b><br/>',
        valueSuffix: ' hrs'
      },
      series: this.getSeriesDataOfProjectsVsTime(),
      minSize: 0,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 250
          },
          chartOptions: {
            series: [{
              id: 'versions',
              dataLabels: {
                enabled: !1
              }
            }]
          }
        }]
      }
    } as any);
  }

  private getDataForProjectVsTime() {

    const colors = HighCharts.getOptions().colors;
    const projectsAndHours = this.chartsData.projects;
    const projects = Object.keys(projectsAndHours);

    let drilldownsDataLen, brightnessVal, colorIndex = 2;
    const drillDowns = [], total = [], versions = [];

    for (let d = 0; d < projects.length; d++) {
      const project = projects[d];
      drillDowns.push({
        y: projectsAndHours[project].total_hours,
        color: colors[colorIndex],
        drilldown: {
          name: project,
          categories: ['billed', 'worked'],
          data: [projectsAndHours[project].billed_hours, projectsAndHours[project].worked_hours]
        }
      });
      colorIndex++;
    }
    for (let f = 0; f < drillDowns.length; f += 1) {
      total.push({
        name: projects[f],
        y: drillDowns[f].y,
        color: drillDowns[f].color,
        parent_name: 'total'
      });
      drilldownsDataLen = drillDowns[f].drilldown.data.length;
      for (let i = 0; i < drilldownsDataLen; i += 1) {
        brightnessVal = 0.2 - i / drilldownsDataLen / 5;
        versions.push({
          name: drillDowns[f].drilldown.categories[i],
          y: drillDowns[f].drilldown.data[i],
          parent_name: drillDowns[f].drilldown.name,
          color: new HighCharts.Color(drillDowns[f].color).brighten(brightnessVal).get()
        });
      }
    }

    return {total, versions};
  }

  private getSeriesDataOfProjectsVsTime() {

    const {total, versions} = this.getDataForProjectVsTime();

    return [{
      name: 'Total',
      data: total,
      size: '60%',
      dataLabels: {
        formatter() {
          return null;
        },
        color: '#ffffff',
        distance: -50
      }
    }, {
      name: 'Versions',
      data: versions,
      size: '80%',
      innerSize: '60%',
      dataLabels: {
        formatter() {
          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + 'hrs' : null;
        }
      },
      id: 'versions'
    }];

  }

}
