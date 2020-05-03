import { Component, OnInit} from '@angular/core';
import {  Router  } from '@angular/router';
import {  ClientServiceService} from '../../client-service.service';
import {  BestCropPoints} from '../../best-crop-points.model';
import {  CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-plant-finder',
  templateUrl: './plant-finder.component.html',
  styleUrls: ['./plant-finder.component.css']
})
export class PlantFinderComponent implements OnInit {

  constructor(private router: Router, private connectionService: ClientServiceService, private cookie: CookieService) {}

  location: any; // user entered location that they are going to cultivate
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
  loaderGif = false;  // hide the loader gif at the beginning of the page
  formContentDisplayStatus = true; // display the form taht get location to predict the best plant
  areaqty: any; // the area quantity that user going to cultivate
  public plantEmpty; // plant field empty
  public areaEmpty; // area field empty
  fullPage = true; // display the full page div at the beginning of the page
  plantDetails = false; // hide the plant details div at the beginning of the page
  confirmation = false; // hide the confirmation div at the beginning of the page
  userId;     // for current user Id
  plantName = [];
  area = [];
  locationEmpty = false;
  bestPlant;
  private maxPoints: number;
  public pieChartLabels: string[] = this.plantName;
  public pieChartData = [];
  public pieChartType = 'pie';

  ngOnInit() {
    this.userId = this.cookie.get('user_Id');
    this.connectionService.clientArea(this.userId).subscribe( // get cultivated area details on given user id
      data => {

        // tslint:disable-next-line:forin
        for (const x of data) {
          this.plantName.push(x.plant_name);
          this.area.push(x.cultivatedArea);
        }
        // taken user area turn to percentage
        let sum = 0;
        for ( let i = 0; i < this.area.length; i++ ) {
          sum += parseInt( this.area[i], 10 );
        }
        const possibilities = [];
        for (const x of this.area) {
          possibilities.push(Math.round((x / sum) * 100));
        }

        this.pieChartData = possibilities;          // assign values
        this.pieChartLabels = this.plantName;   // assign values
      });
  }

  validator(value: any) { // validate the text fields
    // tslint:disable-next-line:triple-equals
    if (String(value).length == 0) {
      return false; // return false if user did not enter data to the text field
    }
    // tslint:disable-next-line:triple-equals
    if (String(value) == 'undefined') {
      return false; // return false if the user entered data to the text field is undefined
    }
    return true; // return true if the user entered data to the text field is defined
  }
  submitProcess(authenticated: boolean, value: any) {
    if (authenticated) {
    } else {
    }
  }

  onSubmitBestCrop(value: any) { // display the details of the best crop
    // tslint:disable-next-line:no-unused-expression triple-equals
    if (value.location == undefined) {
      this.locationEmpty = true;
    } else {
      this.loaderGif = true;    // loader gif display
      this.maxPoints = 0;
      this.formContentDisplayStatus = false;  // hide th form that entered the location
      this.connectionService.getBestCrop().subscribe(   // get the best crop details
        data => {

          // @ts-ignore
          // tslint:disable-next-line:max-line-length
          this.ashPlantainPoints = Math.round(Number(data.bestcrop.AshPlantainPoints) * 100) / 100;   // get ash plantain points as a percentage
          if (this.maxPoints < this.ashPlantainPoints) {
            this.maxPoints = this.ashPlantainPoints;
            this.bestPlant = 'Ash Plantain';
          }
          // @ts-ignore
          this.brinjalPoints = Math.round(Number(data.bestcrop.BrinjalPoints) * 100) / 100; // get brinjal points as a percentage
          if (this.maxPoints < this.brinjalPoints) {
            this.maxPoints = this.brinjalPoints;
            this.bestPlant = 'Brinjal';
          }
          // @ts-ignore
          this.cucumberPoints = Math.round(Number(data.bestcrop.CucumberPoints) * 100) / 100; // get cucumber points as a percentage
          if (this.maxPoints < this.cucumberPoints) {
            this.maxPoints = this.cucumberPoints;
            this.bestPlant = 'Cucumber';
          }
          // @ts-ignore
          // tslint:disable-next-line:max-line-length
          this.ladiesFingerPoints = Math.round(Number(data.bestcrop.LadiesFingerPoints) * 100) / 100; // get ladies finger points as a percentage
          if (this.maxPoints < this.ladiesFingerPoints) {
            this.maxPoints = this.ladiesFingerPoints;
            this.bestPlant = 'Ladies Finger';
          }
          // @ts-ignore
          this.redPumpkinPoints = Math.round(Number(data.bestcrop.RedPumpkinPoints) * 100) / 100; // get red pumpkin points as a percentage
          if (this.maxPoints < this.redPumpkinPoints) {
            this.maxPoints = this.redPumpkinPoints;
            this.bestPlant = 'Red Pumpkin';
          }
          // @ts-ignore
          this.marketPriceHighestPoints = data.bestcrop.MarketPriceHighestPoints;   // get the market price highest point details
          // @ts-ignore
          this.marketPriceBestPlant = data.bestcrop.MarketPriceBestPlant;           // get the market price best plant details
          // @ts-ignore
          this.temperatureHighestPoints = data.bestcrop.TemperatureHighestPoints;   // get the temperature highest point details
          // @ts-ignore
          this.temperatureBestPlant = data.bestcrop.TemperatureBestPlant;           // get the temperature best plant details
          // @ts-ignore
          this.rainfallHighestPoints = data.bestcrop.RainfallHighestPoints;         // get the rainfall highest point details
          // @ts-ignore
          this.rainfallBestPlant = data.bestcrop.RainfallBestPlant;                // get the rainfall best plant details
          // @ts-ignore
          this.cultivatedAreaHighest = data.bestcrop.cultivatedAreaHighest;        // get the cultivated area highest point details
          this.loaderGif = false; // hide the loader gif
          this.plantDetails = true; // display predicted plant details
        });
    }
  }
  choosePlant() { // choose the crop to plant
    this.fullPage = false; // hide the full page div
    this.confirmation = true; // display the confirmation div
  }
  cancel() { // when cancelling redirect to the dashboard
    this.router.navigate(['/client/dashboard']);
  }
  onSubmitConfirm(value: any) {
    if (!this.validator(this.plant)) {
      this.plantEmpty = true;
    } else if (!this.validator(this.areaqty)) {
      this.areaEmpty = true;
    } else {
      // post values to the backend
      const chosen = {
        confirmUId: this.userId,
        confirmPlant: this.plant,
        confirmArea: this.areaqty,
      };
      // tslint:disable-next-line:max-line-length
      this.connectionService.chosenCrop(chosen).subscribe(data => this.submitProcess(data, value), error => alert('Problem in submitting. Please check and try again..'));
      this.router.navigate(['/client/dashboard']);
    }
  }
  back() { // back to the best crop details
    this.confirmation = false;
    this.fullPage = true;
  }

}
