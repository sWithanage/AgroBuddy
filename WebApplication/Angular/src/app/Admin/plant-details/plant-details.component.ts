import { Component , OnInit} from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'plant-details.component.html'
})
export class PlantDetailsComponent implements OnInit {
  crop: any[];
  plantDetails: any[];
  plantName: string;
  part1 = true;
  part2 = false;
  part3 = false;
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
  constructor(private connectionService: AdminServiceService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.connectionService.getCropDetails().subscribe(
      data => {
        this.crop = data;
        console.log(data);
      });

    this.route.queryParams
      .filter(params => params.plant)
      .subscribe(params => {

        this.plantName = params.plant;
        console.log(this.plantName);
      });

    this.connectionService.getPlantDetails(this.plantName).subscribe(
      data => {
        this.plantDetails = data;
        this.cropName = data[0].crop_name;
        this.cropImage = data[0].crop_image;
        this.cropDescription = data[0].crop_description;
        this.scientificName = data[0].scientific_name;
       this.nutrition = data[0].nutrition;
       this.cultivatedArea = data[0].cultivated_area;
       this.cropId = data[0].crop_id;
       this.temperature = data[0].temperature;
       this.duration = data[0].duration;
       this.percentage = data[0].percentage;

      });
  }


  updateDetails() {
    this.part1 = false;
    this.part2 = true;
    this.part3 = false;
  }

  submitUpdates(value: any) {
      console.log(value);
    this.connectionService.updatePlant( value).subscribe(
      data => console.log(value)
    );
  }

  deleteDetails(cropId: string) {
    console.log(cropId);
    console.log(cropId);
    this.connectionService.deletePlant(cropId).subscribe(
      data => console.log(cropId)
    );
  }
}
