import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../../../client-service.service';

@Component({
  selector: 'app-price-variation',
  templateUrl: './price-variation.component.html',
  styleUrls: ['./price-variation.component.css']
})
export class PriceVariationComponent implements OnInit {

  prices: any[];          // array for store all the data set
  week = [];              // array to store the week details
  ashPlantainArray = [];  // array to store ash plantain prices
  brinjals = [];          // array to store brinjal prices
  cucumber = [];          // array to store cucumber prices
  ladiesFingers = [];     // array to store ladies fingers prices
  redPumpkin = [];        // array to store red pumpkin prices
  constructor(private service: ClientServiceService) {
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10
  };

  public barChartLabels: string[] = this.week;
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartColors: Array<any> = [
    {backgroundColor: '#b8e0b8'},
    {backgroundColor: '#6b2e6b'},
    {backgroundColor: '#c9f76e'},
    {backgroundColor: '#2dd22d'},
    {backgroundColor: '#ec9513'}
  ];

  public barChartDataSet;

  async ngOnInit() {
    this.service.getMarketPrice().subscribe(    // get market prices
      data => {
        this.prices = data;
        for (const plant of data) {
          this.week.push(plant.yearWithWeek);
          this.ashPlantainArray.push(plant.AshPlantain);
          this.brinjals.push(plant.Brinjal);
          this.cucumber.push(plant.Cucumber);
          this.ladiesFingers.push(plant.LadiesFinger);
          this.redPumpkin.push(plant.RedPumpkin);
        }
        this.barChartLabels = this.week;
        this.barChartDataSet = [{data: this.ashPlantainArray, label: 'AshPlantain'},
          {data: this.brinjals, label: 'Brinjals'}, {data: this.cucumber, label: 'Cucumber'},
          {data: this.ladiesFingers, label: 'Ladies-Fingers'}, {data: this.redPumpkin, label: 'Red Pumpkin'}];
      });
    // @ts-ignore
    this.delay(1000);
    this.updateTable();     // call the update table method
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  // assigning values
  updateTable() {
    this.barChartLabels = this.week;
    this.barChartDataSet = [{data: this.ashPlantainArray, label: 'AshPlantain'},
      {data: this.brinjals, label: 'Brinjals'}, {data: this.cucumber, label: 'Cucumber'},
      {data: this.ladiesFingers, label: 'Ladies-Fingers'}, {data: this.redPumpkin, label: 'Red Pumpkin'}];
  }
}

