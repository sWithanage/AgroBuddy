import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';

@Component({
  templateUrl: './cultivated-areas.component.html'
})
export class CultivatedAreasComponent implements OnInit {
  crop: any[];

  constructor(private connectionService: AdminServiceService) {}
  area = [50, 40, 30, 60, 40];

  public pieChartLabels: string[] = [
    'Ash Plantain',
    'Brinjals',
    'Cucumber',
    'Ladies-Fingers',
    'Red Pumpkin'
  ];
  public pieChartData: number[] = this.area;
  public pieChartType = 'pie';

  /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  ngOnInit(): void {

  }
}
