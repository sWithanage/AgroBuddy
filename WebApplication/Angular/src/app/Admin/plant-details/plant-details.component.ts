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

  cropName: string;
  cropImage: string;
  cropDescription: string;
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
      });
  }



}
