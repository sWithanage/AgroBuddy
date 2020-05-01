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
  date: any; // user entered date that they are going to cultivate
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
  loaderGif = false;
  formContentDisplayStatus = true;
  areaqty: any; // the area quantity that user going to cultivate
  public dateEmpty; // date field empty
  public plantEmpty; // plant field empty
  public areaEmpty; // area field empty
  fullPage = true; // display the full page div at the begining of the page
  plantDetails = false; // hide the plant details div at the begining of the page
  confirmation = false; // hide the confirmation div at the begining of the page
  userId;
  plantName = [];
  area = [];

  public pieChartLabels: string[] = this.plantName;
  public pieChartData = [];
  public pieChartType = 'pie';
  locationEmpty = false;
  bestPlant = 'sasa';
  private maxPoints: number;
  ngOnInit() {
    this.userId = this.cookie.get('user_Id');
    this.connectionService.clientArea(this.userId).subscribe( // get cultivated area details on given user id
      data => {

        // tslint:disable-next-line:forin
        for (const x of data) {
          this.plantName.push(x.plant_name);
          this.area.push(x.cultivatedArea);
        }
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
      this.loaderGif = true;
      this.maxPoints = 0;
      this.formContentDisplayStatus = false;
      this.connectionService.getBestCrop().subscribe(
        data => {

          // @ts-ignore
          this.ashPlantainPoints = Math.round(Number(data.bestcrop.AshPlantainPoints) * 100) / 100;
          if (this.maxPoints < this.ashPlantainPoints) {
            this.maxPoints = this.ashPlantainPoints;
            this.bestPlant = 'Ash Plantain';
          }
          // @ts-ignore
          this.brinjalPoints = Math.round(Number(data.bestcrop.BrinjalPoints) * 100) / 100;
          if (this.maxPoints < this.brinjalPoints) {
            this.maxPoints = this.brinjalPoints;
            this.bestPlant = 'Brinjal';
          }
          // @ts-ignore
          this.cucumberPoints = Math.round(Number(data.bestcrop.CucumberPoints) * 100) / 100;
          if (this.maxPoints < this.cucumberPoints) {
            this.maxPoints = this.cucumberPoints;
            this.bestPlant = 'Cucumber';
          }
          // @ts-ignore
          this.ladiesFingerPoints = Math.round(Number(data.bestcrop.LadiesFingerPoints) * 100) / 100;
          if (this.maxPoints < this.ladiesFingerPoints) {
            this.maxPoints = this.ladiesFingerPoints;
            this.bestPlant = 'Ladies Finger';
          }
          // @ts-ignore
          this.redPumpkinPoints = Math.round(Number(data.bestcrop.RedPumpkinPoints) * 100) / 100;
          if (this.maxPoints < this.redPumpkinPoints) {
            this.maxPoints = this.redPumpkinPoints;
            this.bestPlant = 'Red Pumpkin';
          }
          // @ts-ignore
          this.marketPriceHighestPoints = data.bestcrop.MarketPriceHighestPoints;
          // @ts-ignore
          this.marketPriceBestPlant = data.bestcrop.MarketPriceBestPlant;
          // @ts-ignore
          this.temperatureHighestPoints = data.bestcrop.TemperatureHighestPoints;
          // @ts-ignore
          this.temperatureBestPlant = data.bestcrop.TemperatureBestPlant;
          // @ts-ignore
          this.rainfallHighestPoints = data.bestcrop.RainfallHighestPoints;
          // @ts-ignore
          this.rainfallBestPlant = data.bestcrop.RainfallBestPlant;
          // @ts-ignore
          this.cultivatedAreaHighest = data.bestcrop.cultivatedAreaHighest;
          this.loaderGif = false;
          this.plantDetails = true;
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
