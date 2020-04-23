import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import {AdminServiceService} from '../../../../admin-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mix-stats',
  templateUrl: './mix-stats.component.html'
})
export class MixstatsComponent implements OnInit {
  crop_name: any;
  brinjalPercentage: any;
  ladiesfingersPercentage: any;
  pumpkinPecentage: any;
  cucmberPecentage: any;
  ashPlantainPecentage: any;
  constructor(private connectionService: AdminServiceService, private route: ActivatedRoute) { }

 async ngOnInit() {
   this.connectionService.getAllPlants().subscribe(
     data => {
       console.log(data);

   for (const dataElement of data) {
     // tslint:disable-next-line:triple-equals
     if (dataElement.crop_name == 'Brinjal') {
       this.brinjalPercentage.push(dataElement.percentage);
     }
     // tslint:disable-next-line:triple-equals
     if (dataElement.crop_name == 'Ladies Fingers') {
       this.ladiesfingersPercentage.push(dataElement.percentage);
     }
     // tslint:disable-next-line:triple-equals
     if (dataElement.crop_name == 'Cucumber') {
       this.cucmberPecentage.push(dataElement.percentage);
     }
     // tslint:disable-next-line:triple-equals
     if (dataElement.crop_name == 'Pumpkin') {
       this.pumpkinPecentage.push(dataElement.percentage);
     }
     // tslint:disable-next-line:triple-equals
     if (dataElement.crop_name == 'Ash Plantain') {
       this.ashPlantainPecentage.push(dataElement.percentage);
     }

   }
   });


    const chart = c3.generate({
      bindto: '#visitor',
      data: {
        columns: [['Brinjal', this.brinjalPercentage], ['Ash Plantain', 8], ['Ladies Fingers', 6], ['Cucumber', 2], ['Red Pumkin', 10]],
        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        title: 'Sales',
        width: 20
      },

      legend: {
        hide: true
        // or hide: 'data1'
        // or hide: ['data1', 'data2']
      },
      color: {
        pattern: ['#4798e8', '#01c0c8', '#f6f6f6']
      }
    });
  }

}
