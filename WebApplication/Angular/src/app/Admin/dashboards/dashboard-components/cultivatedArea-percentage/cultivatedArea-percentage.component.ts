import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import {AdminServiceService} from '../../../../admin-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cultivatedArea-percentage',
  templateUrl: './cultivatedArea-percentage.component.html'
})
export class CultivatedAreaPercentageComponent implements OnInit {
  crop_name: any;
  brinjalPercentage: any;
  ladiesfingersPercentage: any;
  pumpkinPecentage: any;
  cucmberPecentage: any;
  ashPlantainPecentage: any;
  constructor(private connectionService: AdminServiceService, private route: ActivatedRoute) { }

  async ngOnInit() {

    /*--------------------get all plant details--------------------*/
    this.connectionService.getAllPlants().subscribe(
      data => {

        for (const dataElement of data) {
          // tslint:disable-next-line:triple-equals
          if (dataElement.crop_name == 'Brinjal') {
            this.brinjalPercentage = dataElement.cultivated_area_percentage;
          }
          // tslint:disable-next-line:triple-equals
          if (dataElement.crop_name == 'Ladies Fingers') {
            this.ladiesfingersPercentage = dataElement.cultivated_area_percentage;
          }
          // tslint:disable-next-line:triple-equals
          if (dataElement.crop_name == 'Cucumber') {
            this.cucmberPecentage = dataElement.cultivated_area_percentage;
          }
          // tslint:disable-next-line:triple-equals
          if (dataElement.crop_name == 'Pumpkin') {
            this.pumpkinPecentage = dataElement.cultivated_area_percentage;
          }
          // tslint:disable-next-line:triple-equals
          if (dataElement.crop_name == 'Ash Plantain') {
            this.ashPlantainPecentage = dataElement.cultivated_area_percentage;
          }

        }
        // tslint:disable-next-line:max-line-length
        updatePie(this.brinjalPercentage, this.ashPlantainPecentage, this.ladiesfingersPercentage, this.cucmberPecentage, this.pumpkinPecentage);
      });

    function updatePie(brinjalPercentage, ashPlantainPecentage, ladiesfingersPercentage, cucmberPecentage, pumpkinPecentage) {
      const chart = c3.generate({
        bindto: '#visitor',
        data: {
          // tslint:disable-next-line:max-line-length
          columns: [['Brinjal', Number(brinjalPercentage)], ['Ash Plantain', Number(ashPlantainPecentage)], ['Ladies Fingers', Number(ladiesfingersPercentage)], ['Cucumber', Number(cucmberPecentage)], ['Red Pumkin', Number(pumpkinPecentage)]],
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
          pattern: ['#00E8E6', '#00297D', '#FCFF00', '#EC007D', '#76C5AD']
        }
      });
    }
  }
}
