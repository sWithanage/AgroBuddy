import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../client-service.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-cultivated-area',
  templateUrl: './cultivated-area.component.html',
  styleUrls: ['./cultivated-area.component.css']
})
export class CultivatedAreaComponent implements OnInit {

  plantName1 = [];
  plantName2 = [];
  area1 = [];
  area2 = [];
  userId;
  isempty = false;
  constructor(private service: ClientServiceService, private cookie: CookieService) { }

  public pieChartLabels1: string[];  // array to store the labels for pie chart
  public pieChartData1 = [];    // array to store data for pie chart
  public pieChartType = 'pie';
  public pieChartLabels2: string[];  // array to store the labels for pie chart
  public pieChartData2 = [];
  ngOnInit() {
    this.service.getArea().subscribe(   // get cultivated area
      data => {
        // tslint:disable-next-line:forin
        for (const x of data) {
          this.plantName1.push(x.plant_name);
          this.area1.push(x.cultivatedArea);
        }

        // taken all areas turn to percentages
        let sum = 0;
        for (let i = 0; i < this.area1.length; i++) {
          sum += parseInt(this.area1[i], 10);
        }
        const possibilities = [];
        for (const x of this.area1) {
          possibilities.push(Math.round((x / sum) * 100));
        }

        this.pieChartData1 = possibilities;          // assign values
        // this.pieChartLabels = this.plantName;   // assign values
      });
    this.pieChartLabels1 = this.plantName1;

    this.userId = this.cookie.get('user_Id');
    this.service.clientArea(this.userId).subscribe( // get cultivated area details on given user id
      data => {
        // tslint:disable-next-line:forin
        for (const x of data) {
          this.plantName2.push(x.plant_name);
          this.area2.push(x.cultivatedArea);
        }
        // taken user area turn to percentages
        let sum = 0;
        for (let i = 0; i < this.area2.length; i++) {
          sum += parseInt(this.area2[i], 10);
        }
        const possibilities = [];
        for (const x of this.area2) {
          possibilities.push(Math.round((x / sum) * 100));
        }

        // tslint:disable-next-line:triple-equals
        if (possibilities.length == 0) {      // check the data array is empty
          this.isempty = true;                // display the empty message
        } else {
          this.pieChartData2 = possibilities;          // assign values
          this.pieChartLabels2 = this.plantName2;   // assign values
        }
      });
  }
}
