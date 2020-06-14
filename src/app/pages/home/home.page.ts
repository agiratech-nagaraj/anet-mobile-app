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
  mockData = {
    success: true, result: {
      duration: ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05', '2020-01-06', '2020-01-07', '2020-01-08', '2020-01-09', '2020-01-10', '2020-01-11', '2020-01-12', '2020-01-13', '2020-01-14', '2020-01-15', '2020-01-16', '2020-01-17', '2020-01-18', '2020-01-19', '2020-01-20', '2020-01-21', '2020-01-22', '2020-01-23', '2020-01-24', '2020-01-25', '2020-01-26', '2020-01-27', '2020-01-28', '2020-01-29', '2020-01-30', '2020-01-31', '2020-02-01', '2020-02-02', '2020-02-03', '2020-02-04', '2020-02-05', '2020-02-06', '2020-02-07', '2020-02-08', '2020-02-09', '2020-02-10', '2020-02-11', '2020-02-12', '2020-02-13', '2020-02-14', '2020-02-15', '2020-02-16', '2020-02-17', '2020-02-18', '2020-02-19', '2020-02-20', '2020-02-21', '2020-02-22', '2020-02-23', '2020-02-24', '2020-02-25', '2020-02-26', '2020-02-27', '2020-02-28', '2020-02-29', '2020-03-01', '2020-03-02', '2020-03-03', '2020-03-04', '2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11', '2020-03-12', '2020-03-13', '2020-03-14', '2020-03-15', '2020-03-16', '2020-03-17', '2020-03-18', '2020-03-19', '2020-03-20', '2020-03-21', '2020-03-22', '2020-03-23', '2020-03-24', '2020-03-25', '2020-03-26', '2020-03-27', '2020-03-28', '2020-03-29', '2020-03-30', '2020-03-31', '2020-04-01', '2020-04-02', '2020-04-03', '2020-04-04', '2020-04-05', '2020-04-06', '2020-04-07', '2020-04-08', '2020-04-09', '2020-04-10', '2020-04-11', '2020-04-12', '2020-04-13', '2020-04-14', '2020-04-15', '2020-04-16', '2020-04-17', '2020-04-18', '2020-04-19', '2020-04-20', '2020-04-21', '2020-04-22', '2020-04-23', '2020-04-24', '2020-04-25', '2020-04-26', '2020-04-27', '2020-04-28', '2020-04-29', '2020-04-30', '2020-05-01', '2020-05-02', '2020-05-03', '2020-05-04', '2020-05-05', '2020-05-06', '2020-05-07', '2020-05-08', '2020-05-09', '2020-05-10', '2020-05-11', '2020-05-12', '2020-05-13', '2020-05-14', '2020-05-15', '2020-05-16', '2020-05-17', '2020-05-18', '2020-05-19', '2020-05-20', '2020-05-21', '2020-05-22', '2020-05-23', '2020-05-24', '2020-05-25', '2020-05-26', '2020-05-27', '2020-05-28', '2020-05-29', '2020-05-30', '2020-05-31', '2020-06-01', '2020-06-02', '2020-06-03', '2020-06-04', '2020-06-05', '2020-06-06', '2020-06-07', '2020-06-08', '2020-06-09', '2020-06-10', '2020-06-11', '2020-06-12', '2020-06-13', '2020-06-14', '2020-06-15', '2020-06-16', '2020-06-17', '2020-06-18', '2020-06-19', '2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30'],
      total_hours: 908.0,
      billed_hours: 702.0,
      worked_hours: 206.0,
      projects: {
        'Intermx - Widgetworld': {total_hours: 440.0, billed_hours: 432.0, worked_hours: 8.0},
        Leave: {total_hours: 0.0, billed_hours: null, worked_hours: 0.0},
        'Sledge Health': {total_hours: 452.0, billed_hours: 270.0, worked_hours: 182.0},
        'POC - Zoom call': {total_hours: 8.0, billed_hours: 0.0, worked_hours: 8.0},
        'Prorank UI': {total_hours: 8.0, billed_hours: null, worked_hours: 8.0}
      },
      bar_data: [{
        name: 'worked',
        data: [0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 4.0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 8.0, 0.0, 8.0, 8.0, 0, 0, 48.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 0, 0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 8.0, 0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }, {
        name: 'billed',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100.0, 0, 0, 40.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40.0, 0.0, 0, 0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 8.0, 0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 16.0, 0, 0, 16.0, 8.0, 8.0, 8.0, 0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }],
      stacked_bar_data: [{
        name: 'Intermx - Widgetworld-worked',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 8.0, 0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stack: 'worked'
      }, {
        name: 'Intermx - Widgetworld-billed',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0, 0, 40.0, 0, 0.0, 0.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 8.0, 0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 16.0, 0, 0, 16.0, 8.0, 8.0, 8.0, 0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stack: 'billed'
      }, {
        name: 'POC - Zoom call-worked',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stack: 'worked'
      }, {
        name: 'POC - Zoom call-billed',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stack: 'billed'
      }, {
        name: 'Sledge Health-worked',
        // tslint:disable-next-line:max-line-length
        data: [0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 4.0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 0, 8.0, 0.0, 8.0, 8.0, 0, 0, 48.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 8.0, 8.0, 8.0, 8.0, 0, 0, 8.0, 0, 0, 8.0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stack: 'worked'
      }, {
        name: 'Sledge Health-billed',
        data: [0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 110.0, 0, 0, 0.0, 0, 0.0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0, 0, 0, 0.0, 0.0, 0.0, 100.0, 0, 0, 40.0, 0.0, 0.0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0, 0, 0.0, 0, 0, 0.0, 20.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stack: 'billed'
      }, {
        name: 'Leave-worked',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stack: 'worked'
      }, {
        name: 'Leave-billed',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stack: 'billed'
      }, {
        name: 'Prorank UI-worked',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stack: 'worked'
      }, {
        name: 'Prorank UI-billed',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stack: 'billed'
      }]
    }
  };
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
        text: 'Total Hours: ' + this.mockData.result.total_hours
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
