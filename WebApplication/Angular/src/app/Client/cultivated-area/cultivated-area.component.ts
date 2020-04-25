import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../client-service.service';

@Component({
  selector: 'app-cultivated-area',
  templateUrl: './cultivated-area.component.html',
  styleUrls: ['./cultivated-area.component.css']
})
export class CultivatedAreaComponent implements OnInit {

  plantName = [];
  area = [];
  constructor(private service: ClientServiceService) { }
  public pieChartLabels: string[] = this.plantName;
  public pieChartData: number[] = this.area;
  public pieChartType = 'pie';
  ngOnInit() {
    this.service.getArea().subscribe(
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
