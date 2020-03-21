import {Component, AfterViewInit, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import {MarketPriceData} from '../../../../market-price-data.model';

@Component({
  selector: 'app-mix-stats',
  templateUrl: './mix-stats.component.html'
})
export class MixstatsComponent implements AfterViewInit {
  marketPrice: MarketPriceData[];
  url = 'http://localhost:58617/API/Charts/GetCharts';
  Week = ['2011/01', '2011/02', '2011/03'];
  AshPlantain = ['10', '20', '30'];
  Brinjals = ['40', '50', '60'];
  Cucumber = ['40', '50', '60'];
  LadiesFingers = ['40', '50', '60'];
  RedPumpkin = ['40', '50', '100'];
  barchart = [];
  constructor(private http: HttpClient) { }

  ngAfterViewInit () {
    /*this.http.get(this.url).subscribe((result: MarketPriceData[]) => {
      result.forEach(x => {
        this.Week.push(x.Week);
        this.AshPlantain.push(x.AshPlantain);
        this.Brinjals.push(x.Brinjals);
        this.Cucumber.push(x.Cucumber);
        this.LadiesFingers.push(x.LadiesFingers);
        this.RedPumpkin.push(x.RedPumpkin);
      });
      // tslint:disable-next-line:no-unused-expression
      this;*/
    // @ts-ignore
    this.barchart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.Week,
        datasets: [
          {
            data: this.AshPlantain, label: 'Ash Plantain',
            borderColor: '#b8e0b8',
            backgroundColor: 'rgb(184, 224, 184)',
            fill: true,
            bar: {
              space: 0.2,
              // or
              width: 20 // this makes bar width 100px
            },
          },
          {
            data: this.Brinjals, label: 'Brinjal',
            borderColor: '#6b2e6b',
            backgroundColor: 'rgb(204, 168, 240)',
            fill: true,
            bar: {
              space: 50,
              // or
              width: 50 // this makes bar width 100px
            },
          },
          {
            data: this.Cucumber, label: 'Cucumber',
            borderColor: '#c9f76e',
            backgroundColor: 'rgb(201, 247, 110)',
            fill: true,
            bar: {
              space: 0.2,
              // or
              width: 20 // this makes bar width 100px
            },
          },
          {
            data: this.LadiesFingers, label: 'Ladies-Fingers',
            borderColor: '#2dd22d',
            backgroundColor: 'rgb(45, 210, 45)',
            fill: true,
            bar: {
              space: 0.2,
              // or
              width: 20 // this makes bar width 100px
            },
          },
          {
            data: this.RedPumpkin, label: 'Red-Pumpkin',
            borderColor: '#ec9513',
            backgroundColor: 'rgb(236, 149, 19)',
            fill: true,
            bar: {
              space: 0.2,
              // or
              width: 20 // this makes bar width 100px
            },
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}
