import { Component, OnInit } from '@angular/core';
import {MarketPriceData} from '../../../../market-price-data.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-price-variation',
  templateUrl: './price-variation.component.html',
  styleUrls: ['./price-variation.component.css']
})
export class PriceVariationComponent implements OnInit {
  marketPrice: MarketPriceData[];
  url = 'http://localhost:58617/API/Charts/GetCharts';
  Week = ['2020/05', '2020/06', '2020/07', '2020/08'];
  AshPlantain = ['192.59', '181.05', '185.53', '175.26'];
  Brinjals = ['178.97', '187.14', '185.83', '179.51'];
  Cucumber = ['155.41', '140.22', '130.49', '119.00'];
  LadiesFingers = ['267.03', '252.08', '207.00', '162.59'];
  RedPumpkin = ['256.30', '263.70', '258.19', '217.58'];
  area = [50, 40, 30, 60, 40];
  barchart = [];

  constructor(private http: HttpClient) {
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10
  };

  public barChartLabels: string[] = this.Week;
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: this.AshPlantain, label: 'Ash Plantain'},
    {data: this.Brinjals, label: 'Brinjals'},
    {data: this.Cucumber, label: 'Cucumber'},
    {data: this.LadiesFingers, label: 'Ladies-Fingers'},
    {data: this.RedPumpkin, label: 'Red Pumpkin'},
  ];
  public barChartColors: Array<any> = [
    {backgroundColor: '#b8e0b8'},
    {backgroundColor: '#6b2e6b'},
    {backgroundColor: '#c9f76e'},
    {backgroundColor: '#2dd22d'},
    {backgroundColor: '#ec9513'}

  ];
  ngOnInit() {
    /*this.http.get(this.url).subscribe((result: MarketPriceData[]) => {
      result.forEach(x => {
        this.Week.push(x.Week);
        this.AshPlantain.push(x.AshPlantain);
        this.Brinjals.push(x.Brinjals);
        this.Cucumber.push(x.Cucumber);
        this.LadiesFingers.push(x.LadiesFingers);
        this.RedPumpkin.push(x.RedPumpkin);
      });*/
  }
}
