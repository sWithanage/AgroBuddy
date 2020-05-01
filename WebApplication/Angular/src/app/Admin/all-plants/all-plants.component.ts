import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import {AdminServiceService} from '../../admin-service.service';
import {modelDetails} from '../../prediction-model.model';
@Component({
  templateUrl: 'all-plants.component.html'
})
export class AllPlantsComponent {

  plantDetails: any[];
  crop: any[];
  plantName: string;
  part1 = true;
  part2 = false;
  cropId: string;
  cropName: string;
  cropImage: string;
  cropDescription: string;
  scientificName: string;
  nutrition: string;
  temperature: string;
  duration: string;
  percentage: number;
  cultivatedArea: string;
  constructor(private route: ActivatedRoute, private connectionService: AdminServiceService) { }
  // tslint:disable-next-line:use-lifecycle-interface
  fertilizer: string;

  /*------------------------------------get all crop details-----------------------------*/
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.connectionService.getAllPlants().subscribe(
      data => {
        this.plantDetails = data;
      });
  }

  /*----------------------------------Add new plant form----------------------------------*/
  addDetails() {
    this.part1 = false;
    this.part2 = true;
  }

  /*----------------get Add plant Form values and send them to service class---------------*/
  submitAddDetails(value: any) {
    this.connectionService.addPlant(value).subscribe(
      data => this.addedSuccessfully(data), error => alert('There is a error in login. please try again later.'));
  }

  /*-------------------reload page after add plant to database successfully-----------------*/
  addedSuccessfully(data) {
    // tslint:disable-next-line:triple-equals
    if (data == true) {
      window.location.reload();
    }
  }

}
