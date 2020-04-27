import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../client-service.service';

@Component({
  selector: 'app-market-price',
  templateUrl: './market-price.component.html',
  styleUrls: ['./market-price.component.css']
})
export class MarketPriceComponent implements OnInit {
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

  public barChartLabels: string[] = this.week;    // assign weeks as chart labels
  public barChartType = 'bar';
  public barChartLegend = true;

  public ashPlantaindata;
  public brinjalsdata;
  public cucumberdata;
  public ladiesFingersdata;
  public redPumpkindata;

  public ashPlantainColors: Array<any> = [
    {backgroundColor: '#b8e0b8'}];
  public brinjalsColors: Array<any> = [
    {backgroundColor: '#6b2e6b'}];
  public cucumberColors: Array<any> = [
    {backgroundColor: '#c9f76e'}];
  public ladiesFingersColors: Array<any> = [
    {backgroundColor: '#2dd22d'}];
  public redPumpkinColors: Array<any> = [
    {backgroundColor: '#ec9513'}];



  async ngOnInit() {
    this.service.getMarketPrice().subscribe(        // get market prices
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

      });
    // @ts-ignore
    this.delay(2000);
    this.updateTable();   // call the update table method
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  // assigning values
  // tslint:disable-next-line:member-ordering
  firstChat = true;
  updateTable() {
    this.barChartLabels = this.week;
    this.ashPlantaindata = [{data: this.ashPlantainArray, label: 'AshPlantain'}];
    this.brinjalsdata = [{data: this.brinjals, label: 'Brinjals'}];
    this.cucumberdata = [{data: this.cucumber, label: 'Cucumber'}];
    this.ladiesFingersdata = [{data: this.ladiesFingers, label: 'Ladies-Fingers'}];
    this.redPumpkindata = [{data: this.redPumpkin, label: 'Red Pumpkin'}];
    setTimeout(() => {
      this.firstChat = false;
    }, 2000);
  }
}
