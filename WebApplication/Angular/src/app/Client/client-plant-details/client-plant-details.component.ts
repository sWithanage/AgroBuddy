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

  cropName: string;
  cropImage: string;
  cropDescription: string;
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

        this.plantName = params.plant;
        console.log(this.plantName);
      });

    this.connectionService.getPlantDetails(this.plantName).subscribe(
      data => {
        this.plantDetails = data;
        this.cropName = data[0].crop_name;
        this.cropImage = data[0].crop_image;
        this.cropDescription = data[0].crop_description;
      });
  }
}
