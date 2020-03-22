import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {
  area = [50, 40, 30, 60, 40];
  constructor() { }
  public pieChartLabels: string[] = [
    'Ash Plantain',
    'Brinjals',
    'Cucumber',
    'Ladies-Fingers',
    'Red Pumpkin'
  ];
  public pieChartData: number[] = this.area;
  public pieChartType = 'pie';
  ngOnInit() {
  }

}
