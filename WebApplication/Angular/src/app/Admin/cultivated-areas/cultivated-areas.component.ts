import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';

@Component({
  templateUrl: './cultivated-areas.component.html'
})
export class CultivatedAreasComponent implements OnInit {

  plantName = [];
  area = [];
  user: any[];
  userType: string;
  userId: number;
  userFname: string;
  userLname: string;
  part1 = false;
  userplantName = [];
  userArea = [];
  constructor(private connectionService: AdminServiceService) { }
  /*------------------------------store labels in pie chart-----------------------------------*/
  public pieChartLabels: string[];
  /*-----------store of hole cultivated area in pie chart------------------*/
  public pieChartData = [];
  public pieChartType = 'pie';

  /*-----------------------store labels in pie chart(selected user's)------------------------*/
  public chartLabels: string[];
  /*-------store selected user's values of cultivated area in pie chart----------*/
  public chartData = [];
  public chartType = 'doughnut';
  ngOnInit() {
    /*------------------ get hole cultivated area details------------------------*/
    this.connectionService.getArea().subscribe(
      data => {
        /*------------------ assign values to pieChart array ---------------------*/
        // tslint:disable-next-line:forin
        for (const x of data) {
          this.plantName.push(x.plant_name);
          this.area.push(x.cultivatedArea);
        }

        /*------------------calculate the percentage of cultivated areas ---------------------*/
        let sum = 0;
        for ( let i = 0; i < this.area.length; i++ ) {
          sum += parseInt( this.area[i], 10 );
        }
        const possibilities = [];
        for (const x of this.area) {
          possibilities.push(Math.round((x / sum) * 100));
        }

        /*----------------------------------  assign values-------------------------------------*/
        this.pieChartData = possibilities;
      });
    /*----------------------------------  assign labels -------------------------------------*/
    this.pieChartLabels = this.plantName;
    /*----------------------------------  get all users ------------------------------------*/
    this.connectionService.getUserList().subscribe(
      data => {
        this.user = data;
      });
  }
  /*------------------  get selected user's ID from form---------------------------*/
  areaOfUser(user_Id: any) {
    this.userplantName = this.clearArray(this.userplantName);
    this.userArea = this.clearArray(this.userArea);
    this.part1 = true;
    this.userId = user_Id;
    /*---------- get cultivated area details according to selected user ID----------*/
    this.connectionService.clientArea(user_Id).subscribe(   // get cultivated area
      data => {
        if (data.length > 0) {
          // tslint:disable-next-line:forin
          for (const x of data) {
            this.userplantName.push(x.plant_name);
            this.userArea.push(x.cultivatedArea);
          }
          /*---------------calculate the percentage of cultivated area of selected user ----------------*/
          let sum = 0;
          for (let i = 0; i < this.userArea.length; i++) {
            sum += parseInt(this.userArea[i], 10);
          }
          const dataValues = [];
          for (const x of this.userArea) {
            dataValues.push(Math.round((x / sum) * 100));
          }
          /*------------------ assign values ---------------------*/
          this.chartData = dataValues;
          } else {
          this.userplantName = ['No Data'];
          this.chartData = [];
        }
      });
    /*------------------ assign lables ---------------------*/
    this.chartLabels = this.userplantName;
  }
  /*------------- clear data array if there are no data assign to user----------*/
  private clearArray(array: any) {
    while (array.length > 0) {
      array.pop();
    }
    return array;
  }
}
