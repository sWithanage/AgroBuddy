import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../client-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css']
})
export class DiseasesComponent implements OnInit {


  pdisease: any[];
  disease: any[];
  cropId;
  diseaseName;
  diseaseImage;
  diseaseSName;
  diseaseSymptoms;

  constructor(private connectionService: ClientServiceService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    // @ts-ignore
    this.connectionService.getPlantDetails().subscribe(
      data => {
        this.pdisease = data;
        console.log(data);
      });

    this.route.queryParams
      .filter(params => params.plant)
      .subscribe(params => {

        this.cropId = params.plant;
        console.log(this.cropId);
      });

    this.connectionService.getDiseases(this.cropId).subscribe(
      data => {
        this.disease = data;
        this.diseaseName = data[0].disease_name;
        this.diseaseImage = data[0].disease_image;
        this.diseaseSName = data[0].disease_Scientific_name;
        this.diseaseSymptoms = data[0].disease_symptoms;
      });
  }

}
