import { Component, AfterViewInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import * as c3 from 'c3';

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
export class WeatherForcastComponent implements AfterViewInit {
  constructor() { }

  // Barchart
  barChart: chartWeather = {
    type: 'Bar',
    data: {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [[50, 40, 30, 70, 50, 20, 30]]
    },
    options: {
      chartPadding: {
        top: 15,
        left: -25
      },
      axisX: {
        showLabel: true,
        showGrid: false
      },
      axisY: {
        showLabel: false,
        showGrid: false
      },
      fullWidth: true
    }
  };

  // Line chart
  lineChart: chartWeather = {
    type: 'Line',
    data: {
      labels: ['1PM', '2PM', '3PM', '4PM', '5PM', '6PM'],
      series: [[2, 0, 5, 2, 5, 2]]
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

  ngAfterViewInit() {
    const chart2 = c3.generate({
      bindto: '#product-sales1',
      data: {
        columns: [
          ['Iphone', 5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
          ['Ipad', 1, 2, 8, 3, 4, 5, 7, 6, 5, 6, 4, 3, 3, 12, 5, 6, 3]
        ],
        type: 'spline'
      },
      axis: {
        y: {
          show: true,
          tick: {
            count: 0,
            outer: false
          }
        },
        x: {
          show: true
        }
      },
      padding: {
        top: 40,
        right: 10,
        bottom: 40,
        left: 20
      },
      point: {
        r: 0
      },
      legend: {
        hide: false
      },
      color: {
        pattern: ['#ccc', '#4798e8']
      }
    });

    const chartNewSasaCreated2 = c3.generate({
      bindto: '#product-sales1',
      data: {
        columns: [
          ['Iphone', 5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
          ['Ipad', 1, 2, 8, 3, 4, 5, 7, 6, 5, 6, 4, 3, 3, 12, 5, 6, 3]
        ],
        type: 'spline'
      },
      axis: {
        y: {
          show: true,
          tick: {
            count: 0,
            outer: false
          }
        },
        x: {
          show: true
        }
      },
      padding: {
        top: 40,
        right: 10,
        bottom: 40,
        left: 20
      },
      point: {
        r: 0
      },
      legend: {
        hide: false
      },
      color: {
        pattern: ['#ccc', '#4798e8']
      }
    });
  }
}
