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

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.connectionService.getAllPlants().subscribe(
      data => {
        this.plantDetails = data;
      });
  }
  addDetails() {
    this.part1 = false;
    this.part2 = true;
  }
  submitAddDetails(value: any) {
    this.connectionService.addPlant(value).subscribe(
      data => this.addedSuccessfully(data), error => alert('There is a error in login. please try again later.'));
  }

  addedSuccessfully(data) {
    // tslint:disable-next-line:triple-equals
    if (data == true) {
      window.location.reload();
    }
  }

}
