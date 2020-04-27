import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../client-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css']
})
export class DiseasesComponent implements OnInit {

  disease: any[];
  cropId;
  diseaseName;
  diseaseImage;
  diseaseSName;
  diseaseSymptoms;

  constructor(private connectionService: ClientServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams    // get the crop id from the previous page
      .filter(params => params.plant)
      .subscribe(params => {

        this.cropId = params.plant;
      });

    this.connectionService.getDiseases(this.cropId).subscribe(    // get diseases on the given crop id
      data => {
        this.disease = data;
        this.diseaseName = data[0].disease_name;
        this.diseaseImage = data[0].disease_image;
        this.diseaseSName = data[0].disease_Scientific_name;
        this.diseaseSymptoms = data[0].disease_symptoms;
      });
  }

}
