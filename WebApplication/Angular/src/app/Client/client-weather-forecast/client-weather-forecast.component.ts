import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../client-service.service';

@Component({
  selector: 'app-client-weather-forecast',
  templateUrl: './client-weather-forecast.component.html',
  styleUrls: ['./client-weather-forecast.component.css']
})
export class ClientWeatherForecastComponent implements OnInit {

  dataSetTemp = [];   // array to store the dataset of temperature
  labelsTemp = [];    // array to store the labels of temperature
  private countTemp = 1;
  dataSetRain = [];   // array to store the dataset of rainfall
  labelsRain = [];    // array to store the labels of rainfall
  private countRain = 1;
  currentTemperature: any;
  rainfallValue: any;
  constructor(private connectionService: ClientServiceService) {
  }

  public lineChartDataTemp: Array<any> = [
    { data: this.dataSetTemp, label: '°C' }
  ];
  public lineChartLabelsTemp: Array<any> = this.labelsTemp;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartDataRain: Array<any> = [
    { data: this.dataSetRain, label: 'mm' }
  ];
  public lineChartLabelsRain: Array<any> = this.labelsRain;

  public lineChartColors: Array<any> = [
    {
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
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  ngOnInit(): void {

    // get forecasted temperature data
    this.connectionService.getTemperatureData().subscribe(
      data => {
        for (const element of data) {
          // @ts-ignore
          this.dataSetTemp.push(Number(element.avgTemp));
          this.labelsTemp.push('Day ' + this.countTemp);
          this.countTemp = this.countTemp + 1;
        }
        this.lineChartDataTemp = this.dataSetTemp;
        this.lineChartLabelsTemp = this.labelsTemp;
      });

    // get current temperature
    this.connectionService.getCurrentWeather()
      .subscribe(data => {
        this.currentTemperature = data[0].temp;
      });

    // get forecasted rainfall data
    this.connectionService.getRainfallData().subscribe(
      data => {
        for (const element of data) {
          // @ts-ignore
          this.dataSetRain.push(Number(element.rainFall));
          this.labelsRain.push('Day ' + this.countRain);
          this.countRain = this.countRain + 1;
        }
        this.lineChartDataRain = this.dataSetRain;
        this.lineChartLabelsRain = this.labelsRain;
      });
    // get current data
    this.connectionService.getCurrentWeather()
      .subscribe(data => {
        console.log(data);
        // @ts-ignore
        this.rainfallValue = data[0].rain_1h;
        console.log('Rain fall temp' + this.rainfallValue);
      });
  }
}
