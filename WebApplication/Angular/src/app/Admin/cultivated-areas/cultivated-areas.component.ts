import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';

@Component({
  templateUrl: './cultivated-areas.component.html'
})
export class CultivatedAreasComponent implements OnInit {
  crop: any[];

  constructor(private connectionService: AdminServiceService) {}
  // Doughnut
  public doughnutChartLabels: string[] = [
    'Brinjal',
    'Cucumber',
    'Ladies ingers',
    'Red pumpkin',
    'Ash plantain'
  ];
  public doughnutChartData: number[] = [10, 20, 30, 30, 10];
  public doughnutChartType = 'doughnut';
  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];

    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }


  ngOnInit(): void {
  }
}
