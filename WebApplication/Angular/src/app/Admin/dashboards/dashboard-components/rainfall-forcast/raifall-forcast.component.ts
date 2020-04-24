import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import * as c3 from 'c3';
import {AdminServiceService} from '../../../../admin-service.service';

declare var require: any;

// tslint:disable-next-line:class-name
export interface chartRainfall {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rainfall-forcast',
  templateUrl: './rainfall-forcast.component.html',
  styleUrls: ['./rainfall-forcast.component.scss']
})
export class RaifallForcastComponent implements OnInit {
  date: any;
  rainfall: any[];
  avgTemp: any;
  minTemp: any;
  constructor(private connectionService: AdminServiceService) {
  }
  ngOnInit(): void {
    this.connectionService.getRainfallData().subscribe(
      data => {
        console.log(data);
        this.rainfall = data[0].rainFall;
      });
  }
  public lable: any[] = this.date;
  public type = 'Line';
  public options = true;

  // Line chart
   lineChart: chartRainfall = {
    type: 'Line',
    data: {
      labels: ['Jan1', 'Jan2', 'Jan3', 'jan4', 'Feb1', 'Feb3', 'Feb4', 'Mar1', 'Mar2'],
       series: [{data: this.rainfall}]
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
}
