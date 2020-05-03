import { Component , OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import * as c3 from 'c3';
import {AdminServiceService} from '../../../../admin-service.service';

declare var require: any;


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-marketPrice-forcast',
  templateUrl: './marketPrice-forcast.component.html',
  styleUrls: ['./marketPrice-forcast.component.scss']
})
export class MarketPriceForcastComponent implements  OnInit {
  prices: any[];
  week = [];
  ashPlantainArray = [];
  brinjals = [];
  cucumber = [];
  ladiesFingers = [];
  redPumpkin = [];
  BrinjalPrice: number;
  brinjalDataArray = ['Brinjal', 0];
  ashPlantainDataArray = ['Ash Plantain', 0];
  cucumberDataArray = ['Cucumber', 0];
  ladiesFingerDataArray = ['Ladies Finger', 0];
  redPumpkinDataArray = ['Red Pumpkin', 0];
  constructor(private connectionService: AdminServiceService) { }
  ngOnInit() {
    /*----------------get market price data-------------*/
    this.connectionService.getMarketPrice().subscribe(
      data => {
        this.prices = data;
        this.brinjalDataArray.splice(-1, 1);
        this.ashPlantainDataArray.splice(-1, 1);
        this.redPumpkinDataArray.splice(-1, 1);
        this.cucumberDataArray.splice(-1, 1);
        this.ladiesFingerDataArray.splice(-1, 1);
        for (const plant of data) {
          this.brinjalDataArray.push(plant.Brinjal);
          this.ashPlantainDataArray.push(plant.AshPlantain);
          this.redPumpkinDataArray.push(plant.RedPumpkin);
          this.cucumberDataArray.push(plant.Cucumber);
          this.ladiesFingerDataArray.push(plant.LadiesFinger);
          this.ngAfterViewInit();
        }
      });
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    const chart2 = c3.generate({

      bindto: '#product-sales',
      data: {
        columns: [
          this.brinjalDataArray,
          this.ashPlantainDataArray,
          this.redPumpkinDataArray,
          this.cucumberDataArray,
          this.ladiesFingerDataArray
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
