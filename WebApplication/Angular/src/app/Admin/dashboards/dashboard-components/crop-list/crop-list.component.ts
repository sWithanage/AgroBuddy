import { Component } from '@angular/core';
import {AdminServiceService} from '../../../../admin-service.service';
@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html'
})
export class CropListComponent {
  plantDetails: any[];
  cropName1: string;
  cropName2: string;
  cropName3: string;
  cropName4: string;
  cropName5: string;
  scientificName1: string;
  scientificName2: string;
  scientificName3: string;
  scientificName4: string;
  scientificName5: string;
  constructor(private connectionService: AdminServiceService) {}
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.connectionService.getAllPlants().subscribe(
      data => {
        this.plantDetails = data;
        this.cropName1 = data[0].crop_name = 'Brinjal';
        this.cropName2 = data[0].crop_name = 'Ladies Fingers';
        this.cropName3 = data[0].crop_name = 'Cucumber';
        this.cropName4 = data[0].crop_name = 'pumpkin';
        this.cropName5 = data[0].crop_name = 'Ash Plantain';
        this.scientificName1 = data[0].scientific_name = 'Solanum melongina L';
        this.scientificName2 = data[0].scientific_name = 'Abelmoschus esculentus';
        this.scientificName3 = data[0].scientific_name = 'Cucumis sativus';
        this.scientificName4 = data[0].scientific_name = 'Cucurbita maxima';
        this.scientificName5 = data[0].scientific_name = 'Musa spp';
      });
  }
}
