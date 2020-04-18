import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cultivated-area',
  templateUrl: './cultivated-area.component.html',
  styleUrls: ['./cultivated-area.component.css']
})
export class CultivatedAreaComponent implements OnInit {

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
