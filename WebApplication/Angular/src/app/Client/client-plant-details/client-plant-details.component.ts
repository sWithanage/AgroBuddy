import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientServiceService} from '../../client-service.service';

@Component({
  selector: 'app-client-plant-details',
  templateUrl: './client-plant-details.component.html',
  styleUrls: ['./client-plant-details.component.css']
})
export class ClientPlantDetailsComponent implements OnInit {
  crop: any[];
  plantDetails: any[];
  plantName: string;

  cropId: string;
  cropName: string;
  cropImage: string;
  cropDescription: string;
  scientificName: string;
  temperature: string;
  nutrition: string;
  duration: string;
  cultivatedArea: string;
  fertilizers: string;

  constructor(private connectionService: ClientServiceService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    // @ts-ignore
    this.connectionService.getPlantDetails().subscribe(
      data => {
        this.crop = data;
        console.log(data);
      });

    this.route.queryParams
      .filter(params => params.plant)
      .subscribe(params => {

        this.cropId = params.plant;
        console.log(this.cropId);
      });

    this.connectionService.getPlantDetails(this.cropId).subscribe(
      data => {
        this.plantDetails = data;
        this.cropName = data[0].crop_name;
        this.cropImage = data[0].crop_image;
        this.cropDescription = data[0].crop_description;
        this.scientificName = data[0].scientific_name;
         this.temperature = data[0].temperature;
        this.nutrition = data[0].nutrition;
         this.duration = data[0].duration;
        this.cultivatedArea = data[0].cultivated_area;
        this.fertilizers = data[0].fertilizers;
      });
  }
}
