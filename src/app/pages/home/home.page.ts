import {Component, OnInit} from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  mockData = {
    duration: ['2020-06-01', '2020-06-02', '2020-06-03', '2020-06-04', '2020-06-05', '2020-06-06', '2020-06-07', '2020-06-08', '2020-06-09', '2020-06-10', '2020-06-11', '2020-06-12', '2020-06-13', '2020-06-14', '2020-06-15', '2020-06-16', '2020-06-17', '2020-06-18', '2020-06-19', '2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30'],
    total_hours: 80.0,
    billed_hours: 80.0,
    worked_hours: 0.0,
    projects: {'Intermx - Widgetworld': {total_hours: 80.0, billed_hours: 80.0, worked_hours: 0.0}},
    bar_data: [{
      name: 'worked',
      data: [8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
      name: 'billed',
      data: [8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }],
    stacked_bar_data: [{
      name: 'Intermx - Widgetworld-worked',
      data: [8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'worked'
    }, {
      name: 'Intermx - Widgetworld-billed',
      data: [8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'billed'
    }]
  };

  constructor() {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.plotDateVsTimeChart();
  }

  plotDateVsTimeChart() {
    HighCharts.chart('date-vs-time' as string, {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Date vs Total Time Spent'
      },
      xAxis: {
        categories: this.mockData.duration
      },
      yAxis: {
        title: {
          text: 'Hours'
        }
      },
      series: this.mockData.bar_data
    } as any, (event) => {
    });
  }

}
