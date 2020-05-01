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
  dataSet = [];
  labels = [];
  private count = 1;
  constructor(private connectionService: AdminServiceService, private _weatherService: AdminServiceService) {
  }
  public lineChartData: Array<any> = [
    { data: this.dataSet, label: 'mm' }
  ];
  public lineChartLabels: Array<any> = this.labels;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // dark grey
      backgroundColor: 'rgb(41,98,255,.1)',
      borderColor: '#2962FF',
      pointBackgroundColor: '#2962FF',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#2962FF'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // events
  rainfallValue: any;
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  ngOnInit(): void {
    this.connectionService.getRainfallData().subscribe(
      data => {
        for (const dataElement of data) {
          // @ts-ignore
          this.dataSet.push(Number(dataElement.rainFall));
          this.labels.push('Day ' + this.count);
          this.count = this.count + 1;
        }
        this.lineChartData = this.dataSet;
        this.lineChartLabels = this.labels;
      });

    this._weatherService.getCurrentWeather()
      .subscribe(data => {
        console.log(data);
        // @ts-ignore
        this.rainfallValue = data[0].rain_1h;
      });
  }
}
