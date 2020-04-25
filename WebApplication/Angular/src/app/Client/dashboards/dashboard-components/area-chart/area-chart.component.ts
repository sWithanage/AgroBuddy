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
  public pieChartLabels: string[] = this.plantName;
  public pieChartData: number[] = this.area;
  public pieChartType = 'pie';
  ngOnInit() {
    this.service.getArea().subscribe(   // get cultivated area details
      data => {
        console.log(data);
        // tslint:disable-next-line:forin
        for (const x of data) {
          this.plantName.push(x.plant_name);
          this.area.push(x.cultivatedArea);
        }
      });
    this.pieChartData = this.area;
    this.pieChartLabels = this.plantName;
  }

}
