import { Component, AfterViewInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import * as c3 from 'c3';

declare var require: any;

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements AfterViewInit {
  constructor() { }

  // Barchart
  barChart: Chart = {
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
  lineChart: Chart = {
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
      bindto: '#product-sales',
      data: {
        columns: [
          ['Brinjal', 5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
          ['Ash Plantain', 1, 2, 8, 3, 4, 5, 7, 6, 5, 6, 4, 3, 3, 12, 5, 6, 3],
          ['Red Pumkin', 3, 7, 2, 4, 1, 7, 9 ],
          ['Cucumber' , 4, 2, 5, 1, 1, 2, 4, 3, 5, 6, 2, 8],
          ['Ladies Fingers' , 5, 3, 2, 4, 2, 2, 2, 5, 6, 2, 3, 1]
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

    const chartNewSasaCreated = c3.generate({
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
