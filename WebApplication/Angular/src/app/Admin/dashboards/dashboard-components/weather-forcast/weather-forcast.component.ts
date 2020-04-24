import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import * as c3 from 'c3';
import {chartRainfall} from '..';
import {AdminServiceService} from '../../../../admin-service.service';

declare var require: any;

// tslint:disable-next-line:class-name
export interface chartWeather {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'weather-forcast',
  templateUrl: './weather-forcast.component.html',
  styleUrls: ['./weather-forcast.component.scss']
})
export class WeatherForcastComponent implements OnInit {
  constructor(private connectionService: AdminServiceService) {
  }

  lineChart: chartRainfall = {
    type: 'Line',
    data: {
      labels: ['Jan1', 'Jan2', 'Jan3', 'jan4', 'Feb1', 'Feb3', 'Feb4', 'Mar1', 'Mar2'],
      series: [[2, 0, 5, 2, 5, 2, 3, 1, 6]]
    },
    options: {
      showArea: true,
      showPoint: false,

      chartPadding: {
        left: -35
      },
      axisX: {
        showLabel: true,
        showGrid: false
      },
      axisY: {
        showLabel: false,
        showGrid: true
      },
      fullWidth: true
    }
  };
  date: any;
  rainfall: any;
  avgTemp: any;
  minTemp: any;
  ngOnInit(): void {
    this.connectionService.getTemperatureData().subscribe(
      data => {
        console.log(data);
      });
  }
  }

