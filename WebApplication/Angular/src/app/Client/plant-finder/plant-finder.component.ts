import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientServiceService} from '../../client-service.service';
import {BestCropPoints} from '../../best-crop-points.model';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-plant-finder',
  templateUrl: './plant-finder.component.html',
  styleUrls: ['./plant-finder.component.css']
})
export class PlantFinderComponent implements OnInit {

  constructor(private router: Router, private connectionService: ClientServiceService, private cookie: CookieService) { }

  location: any;    // user entered location that they are going to cultivate
  date: any;        // user entered date that they are going to cultivate
  bestCrop: BestCropPoints[];
  ashPlantainPoints: any;
  brinjalPoints: any;
  cucumberPoints: any;
  ladiesFingerPoints: any;
  redPumpkinPoints: any;
  marketPriceHighestPoints: any;
  marketPriceBestPlant: any;
  temperatureHighestPoints: any;
  temperatureBestPlant: any;
  rainfallHighestPoints: any;
  rainfallBestPlant: any;
  cultivatedAreaHighest: any;
  plant: any;
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
  area = [];
  public pieChartLabels: string[] = this.plantName;
  public pieChartData: number[] = this.area;
  public pieChartType = 'pie';
  ngOnInit() {
    this.userId = this.cookie.get('user_Id');
    console.log('User Id' + this.userId);
    this.connectionService.clientArea(this.userId).subscribe(   // get cultivated area details on given user id
      data => {
        console.log(data);
        // tslint:disable-next-line:forin
        for (const x of data) {
          this.plantName.push(x.plant_name);
          this.area.push(x.cultivated_area);
        }
      });
    this.pieChartData = this.area;
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
        console.log(this.bestCrop);
        this.ashPlantainPoints = data[0].AshPlantainPoints;
        this.brinjalPoints = data[0].BrinjalPoints;
        this.cucumberPoints = data[0].CucumberPoints;
        this.ladiesFingerPoints = data[0].LadiesFingerPoints;
        this.redPumpkinPoints = data[0].RedPumpkinPoints;
        this.marketPriceHighestPoints = data[0].MarketPriceHighestPoints;
        this.marketPriceBestPlant = data[0].MarketPriceBestPlant;
        this.temperatureHighestPoints = data[0].TemperatureHighestPoints;
        this.temperatureBestPlant = data[0].TemperatureBestPlant;
        this.rainfallHighestPoints = data[0].RainfallHighestPoints;
        this.rainfallBestPlant = data[0].RainfallBestPlant;
        this.cultivatedAreaHighest = data[0].cultivatedAreaHighest;
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
    if (!this.validator(this.plant)) {
      this.plantEmpty = true;
    } else if (!this.validator(this.areaqty)) {
      this.areaEmpty = true;
    } else {
      // post values to the backend
      const  chosen = {
        confirmUId: this.userId,
        confirmPlant: this.plant,
        confirmArea: this.areaqty,
      };
      // tslint:disable-next-line:max-line-length
      this.connectionService.chosenCrop(chosen).subscribe(data => this.submitProcess(data, value), error => alert('Problem in submitting. Please check and try again..'));
      this.router.navigate(['/client/dashboard']);
    }
  }
  back() {    // back to the best crop details
    this.confirmation = false;
    this.fullPage = true;
  }

}
