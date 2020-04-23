import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientServiceService} from '../../client-service.service';
import {BestCrop} from '../../best-crop.model';

@Component({
  selector: 'app-plant-finder',
  templateUrl: './plant-finder.component.html',
  styleUrls: ['./plant-finder.component.css']
})
export class PlantFinderComponent implements OnInit {

  constructor(private router: Router, private connectionService: ClientServiceService) { }

  location: any;    // user entered location that they are going to cultivate
  date: any;        // user entered date that they are going to cultivate
  bestCrop: BestCrop[];
  cropId: any;
  cropName: any;
  cropImage: any;
  cropDescription: any;
  cropNutrition: any;
  cropTemperature: any;
  cropDuration: any;
  plant: any;       // database returned best crop name
  areaqty: any;        // the area quantity that user going to cultivate
  public locationEmpty;   // location field empty
  public dateEmpty;       // date field empty
  public plantEmpty;      // plant field empty
  public areaEmpty;       // area field empty
  fullPage =  true;       // display the full page div at the begining of the page
  plantDetails = false;   // hide the plant details div at the begining of the page
  confirmation =  false;  // hide the confirmation div at the begining of the page
  userId;
  plantName = [];
  cArea = [];

  public pieChartData;
  public pieChartType = 'pie';
  public pieChartLabels;

  async ngOnInit() {
    this.connectionService.clientArea(this.userId).subscribe(
      data => {
        for (const area of data) {
          this.plantName.push(area.plantName);
          this.cArea.push(area.area);
        }
      });
    // @ts-ignore
    this.delay(1000);
    this.updateChart();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  updateChart() {
    this.pieChartData = this.cArea;
    this.pieChartLabels = this.plantName;
  }

  validator(value: any) {   // validate the text fields
    // tslint:disable-next-line:triple-equals
    if (String(value).length == 0) {
      return false;         // return false if user did not enter data to the text field
    }
    // tslint:disable-next-line:triple-equals
    if (String(value) == 'undefined') {
      return false;        // return false if the user entered data to the text field is undefined
    }
    return true;          // return true if the user entered data to the text field is defined
  }
  submitProcess(authenticated: boolean, value: any) {
    if (authenticated) {
      console.log('Successfully submitted...!');
    } else {
      console.log('Try again');
    }
  }
  // on the button click in best crop finder
  onSubmitBestCrop(value: any) {
    if (!this.validator(this.location)) {     // validate the location text field
      this.locationEmpty = true;
    } else if (!this.validator(this.date)) {  // validate the date text field
      this.dateEmpty = true;
    } else {
      // psot the location and date to prediction purpose
      // tslint:disable-next-line:max-line-length
      this.connectionService.predict(value).subscribe(data => this.submitProcess(data, value), error => alert('Problem in submitting. Please check and try again..'));
      this.details();   // call the function to display the details of the best crop
    }
  }
  details() {   // display the details of the best crop
    this.plantDetails = true;
    this.connectionService.getBestCrop().subscribe(
      data => {
        this.bestCrop = data;
        this.cropId = data[0].bestCrop_id;
        this.cropName = data[0].bestCrop_name;
        this.cropImage = data[0].bestCrop_image;
        this.cropDescription = data[0].bestCrop_description;
        this.cropNutrition = data[0].bestCropNutrition;
        this.cropTemperature = data[0].bestCropTemperature;
        this.cropDuration = data[0].bestCropDuration;
      });
  }
  choosePlant() {   // choose the crop to plant
    this.fullPage = false;      // hide the full page div
    this.confirmation = true;   // display the confirmation div
  }
  cancel() {  // when cancelling redirect to the dashboard
    this.router.navigate(['/client/dashboard']);
  }
  onSubmitConfirm(value: any) {
    if (!this.validator(this.location)) {
      this.locationEmpty = true;
    } else if (!this.validator(this.date)) {
      this.dateEmpty = true;
    } else {
      // post values to the backend
      // tslint:disable-next-line:max-line-length
      this.connectionService.chosenCrop(value).subscribe(data => this.submitProcess(data, value), error => alert('Problem in submitting. Please check and try again..'));
    }
  }
  back() {    // back to the best crop details
    this.confirmation = false;
    this.fullPage = true;
  }

}
