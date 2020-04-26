import { Component , OnInit} from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'plant-details.component.html'
})
export class PlantDetailsComponent implements OnInit {
  diseases: any[];
  disease_id: any;
  crop_id: any;
  disease_name: any;
  disease_image: any;
  disease_Scientific_name: any;
  disease_symptoms: any;
  crop: any[];
  plantDetails: any[];
  plantName: string;
  part1 = true;
  part2 = false;
  part3 = false;
  part4 = false;
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
  crop_Id: string;
  crop_Name: string;
  crop_Image: string;
  crop_Description: string;
  scientific_Name: string;
  nutr_ition: string;
  tempe_rature: string;
  dura_tion: string;
  perce_ntage: number;
  cultivated_Area: string;
  diseaseId: any;
  diseaseName: any;
  diseaseImage: any;
  diseaseScientificName: any;
  diseaseSymptoms: any;
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
        this.cropId = params.plant;
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
    this.connectionService.getDiseaseDetails(this.cropId).subscribe(
      data => {
        this.diseases = data;
        console.log(data);
        // this.crop_id = data[0].crop_id;
        this.disease_name = data[0].disease_name;
        this.disease_image = data[0].disease_image;
        this.disease_Scientific_name = data[0].disease_Scientific_name;
        this.disease_symptoms = data[0].disease_symptoms;


      });
  }


  updateDetails(cropId: any) {
    this.cropId = cropId;
    this.part1 = false;
    this.part2 = true;
    this.part3 = false;
    this.part4 = false;
    this.updatePlantDetailsToForm();
  }
  updatePlantDetailsToForm() {
    this.connectionService.getPlantListById(this.crop_Id).subscribe(
      data => {
        console.log(data);
        this.cropName = data[0].crop_name;
        this.cropDescription = data[0].crop_description;
        this.cropImage = data[0].crop_image;
        this.scientificName = data[0].scientific_name;
        this.temperature = data[0].temperature;
        this.duration = data[0].duration;
        this.percentage = data[0].percentage;
        this.cultivatedArea = data[0].cultivated_area;
        this.nutrition = data[0].nutrition;
      });
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
  deleteDiseaseRow(disease_id: any) {
    console.log(disease_id);
    this.connectionService.deleteDiseaseDetails(disease_id).subscribe(
      data => console.log(disease_id)
    );
  }
  updateDisease(disease_id: any) {
    this.disease_id = disease_id;
    this.part1 = false;
    this.part2 = false;
    this.part3 = true;
    this.part4 = false;
    this.updateDiseaseDetailsToForm();
  }
  updateDiseaseDetailsToForm() {
    this.connectionService.getDiseaseListById(this.disease_id).subscribe(
      data => {
        console.log(data);
        this.disease_id = data[0].disease_id;
        this.crop_id = data[0].crop_id;
        this.disease_name = data[0].disease_name;
        this.disease_image = data[0].disease_image;
        this.disease_Scientific_name = data[0].disease_Scientific_name;
        this.disease_symptoms = data[0].disease_symptoms;


      });
  }
  submitDiseaseUpdates( values: any, disease_id: number) {
      console.log(this.cropId  );
      this.connectionService.updateDiseaseAll(values, disease_id).subscribe(
        data => console.log(values)
      );
  }
  addDiseaseDetails() {
    this.part1 = false;
    this.part2 = false;
    this.part3 = false;
    this.part4 = true;
  }
  submitDiseaseDetails(value: any) {
    this.connectionService.addDisease(value).subscribe(
      data => console.log(data), error => alert('There is a error in login. please try again later.'
      ));
  }
}
