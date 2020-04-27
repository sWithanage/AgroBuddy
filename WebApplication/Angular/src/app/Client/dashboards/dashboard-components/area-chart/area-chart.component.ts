import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../../../client-service.service';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {

  plantName = [];
  area = [];
  constructor(private service: ClientServiceService) { }

  public pieChartLabels: string[];  // array to store the labels for pie chart
  public pieChartData = [];    // array to store data for pie chart
  public pieChartType = 'pie';

  ngOnInit() {
    this.service.getArea().subscribe(   // get cultivated area
      data => {
        // tslint:disable-next-line:forin
        for (const x of data) {
          this.plantName.push(x.plant_name);
          this.area.push(x.cultivatedArea);
        }
        this.pieChartData = this.area;          // assign values
      });
    this.pieChartLabels = this.plantName;   // assign values
  }
}
