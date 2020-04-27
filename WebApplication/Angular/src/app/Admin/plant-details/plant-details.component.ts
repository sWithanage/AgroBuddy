import { Component , OnInit} from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  cropName: string;
  cropImage: string;
  cropDescription: string;
  scientificName: string;
  nutrition: string;
  temperature: string;
  duration: string;
  percentage: number;
  cultivatedArea: string;
  fertilizers: string;
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
  constructor(private connectionService: AdminServiceService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.connectionService.getCropDetails().subscribe(
      data => {
        this.crop = data;
      });

    this.route.queryParams
      .filter(params => params.plant)
      .subscribe(params => {

        this.plantName = params.plant;
        this.crop_id = params.plant;
      });

    this.connectionService.getPlantDetails(this.plantName).subscribe(
      data => {
        // tslint:disable-next-line:triple-equals
        if ( data.length == 0) {
          this.router.navigate(['/admin/plant']);
        } else {
          this.plantDetails = data;
          this.cropName = data[0].crop_name;
          this.cropImage = data[0].crop_image;
          this.cropDescription = data[0].crop_description;
          this.scientificName = data[0].scientific_name;
          this.nutrition = data[0].nutrition;
          this.cultivatedArea = data[0].cultivated_area;
          this.crop_id = data[0].crop_id;
          this.temperature = data[0].temperature;
          this.duration = data[0].duration;
          this.percentage = data[0].cultivated_area_percentage;
          this.fertilizers = data[0].fertilizers;
        }
        // tslint:disable-next-line:triple-equals
        if (this.fertilizers == null) {
          this.fertilizers = 'No record';
        }
      });
    this.connectionService.getDiseaseDetails(this.crop_id).subscribe(
      data => {
        this.diseases = data;
        // this.crop_id = data[0].crop_id;
        if (data.length > 0) {
          this.disease_id = data[0].disease_id;
          this.disease_name = data[0].disease_name;
          this.disease_image = data[0].disease_image;
          this.disease_Scientific_name = data[0].disease_Scientific_name;
          this.disease_symptoms = data[0].disease_symptoms;
        }

      });
  }


  updateDetails(cropId: any) {
    this.crop_id = cropId;
    this.part1 = false;
    this.part2 = true;
    this.part3 = false;
    this.part4 = false;
    this.updatePlantDetailsToForm();
  }
  updatePlantDetailsToForm() {
    this.connectionService.getPlantListById(this.crop_id).subscribe(
      data => {
        this.cropName = data[0].crop_name;
        this.cropDescription = data[0].crop_description;
        this.cropImage = data[0].crop_image;
        this.scientificName = data[0].scientific_name;
        this.temperature = data[0].temperature;
        this.duration = data[0].duration;
        this.percentage = data[0].percentage;
        this.cultivatedArea = data[0].cultivated_area;
        this.nutrition = data[0].nutrition;
        this.fertilizers = data[0].fertilizers;
      });
  }
  submitUpdates(value: any) {
    this.connectionService.updatePlant( value).subscribe(
      data => this.refreshPage()
    );
  }

  deleteDetails(cropId: string) {
    this.connectionService.deletePlant(cropId).subscribe(
      data => this.refreshPage()
    );
  }

  deleteDiseaseRow(disease_id: any) {
    this.connectionService.deleteDiseaseDetails(disease_id).subscribe(
      data => this.refreshPage()
    );
  }

  updateDisease(disease_id: any) {
    this.disease_id = disease_id;
    this.part1 = false;
    this.part2 = false;
    this.part3 = true;
    this.part4 = false;
    this.updateDiseaseDetailsToForm(disease_id);
  }
  updateDiseaseDetailsToForm(diseaseId) {
    this.connectionService.getDiseaseListById(diseaseId).subscribe(
      data => {
        this.disease_id = data[0].disease_id;
        this.crop_id = data[0].crop_id;
        this.disease_name = data[0].disease_name;
        this.disease_image = data[0].disease_image;
        this.disease_Scientific_name = data[0].disease_Scientific_name;
        this.disease_symptoms = data[0].disease_symptoms;
      });
  }
  submitDiseaseUpdates( values: any, disease_id: number) {
      this.connectionService.updateDiseaseAll(values, disease_id).subscribe(
        data => this.refreshPage()
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
      data => this.addedSuccessfully(data), error => alert('There is a error in login. please try again later.'
      ));
  }

  refreshPage() {
    window.location.reload();
  }

  addedSuccessfully(data) {
    // tslint:disable-next-line:triple-equals
    if (data == true) {
      window.location.reload();
    }
  }
}
