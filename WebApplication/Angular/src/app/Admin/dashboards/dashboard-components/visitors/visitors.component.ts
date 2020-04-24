import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import * as d3 from 'd3';
import { multi } from './data';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import {AdminServiceService} from '../../../../admin-service.service';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss']
})
export class VisitorsComponent implements OnInit {
  model: any[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Visits';
  showGridLines = true;
  innerPadding = 0;
  autoScale = true;
  timeline = false;
  barPadding = 2;
  groupPadding = 0;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  view = '';
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;
  rangeFillOpacity = 0;


  variables: string;
  modelDetails: any[];
  modelName: string;
  variable: string;
  ARIMAmodel: string;
  ARMAmodel: string;
  SARIMAmodel: string;
  RNNmodel: string;
  ANNmodel: string;
  activeModel: string;
  id: number;
  value1: any;
  user: any;
  status: any;
  selectedOption: any;



  colorScheme = {
    domain: ['#2962FF', '#4fc3f7', '#a1aab2']
  };
  schemeType = 'ordinal';
  ARPrecipitationAccuracy: any;
  ARMAPrecipitationAccuracy: any;
  ARIMAPrecipitationAccuracy: any;
  RNNPrecipitationAccuracy: any;
  AUTOARIMAPrecipitationAccuracy: any;
  VARPrecipitationAccuracy: any;
  SARIMAPrecipitationAccuracy: any;
  ARMarketPricePredictionAccuracy: any;
  ARMAMarketPricePredictionAccuracy: any;
  ARIMAMarketPricePredictionAccuracy: any;
  RNNMarketPricePredictionAccuracy: any;
  VARMarketPricePredictionAccuracy: any;
  SARIMAMarketPricePredictionAccuracy: any;
  AUTOARIMAMarketPricePredictonAccuracy: any;
  ARtemperaturePredictionAccuracy: any;
  ARMAtemperaturePredictionAccuracy: any;
  ARIMAtemperaturePredictionAccuracy: any;
  RNNtemperaturePredictionAccuracy: any;
  VARtemperaturePredictionAccuracy: any;
  SARIMAtemperaturePredictionAccuracy: any;
  AUTOARIMAtemperaturePredictonAccuracy: any;


    constructor(private connectionService: AdminServiceService, private route: ActivatedRoute) {
    }

  ngOnInit() {

    this.connectionService.getAllModels().subscribe(
      data => {

        for (const dataElement of data) {
          // tslint:disable-next-line:triple-equals
          if (dataElement.variables == 'brinjalMPrice') {
            this.ARPrecipitationAccuracy = Math.round(dataElement.AR);
            this.ARIMAPrecipitationAccuracy = Math.round(dataElement.ARIMA);
            this.ARMAPrecipitationAccuracy = Math.round(dataElement.ARMA);
            this.RNNPrecipitationAccuracy = Math.round(dataElement.RNN);
            this.AUTOARIMAPrecipitationAccuracy = Math.round(dataElement.AUTOARIMA);
            this.SARIMAPrecipitationAccuracy = Math.round(dataElement.SARIMA);
            this.VARPrecipitationAccuracy = Math.round(dataElement.VAR);
          }
          // tslint:disable-next-line:triple-equals
          if (dataElement.variables == 'temperature') {
            this.ARtemperaturePredictionAccuracy = Math.round(dataElement.AR);
            this.ARIMAtemperaturePredictionAccuracy = Math.round(dataElement.ARIMA);
            this.ARMAtemperaturePredictionAccuracy = Math.round( dataElement.ARMA);
            this.RNNtemperaturePredictionAccuracy = Math.round(dataElement.RNN);
            this.AUTOARIMAtemperaturePredictonAccuracy = Math.round(dataElement.AUTOARIMA);
            this.SARIMAtemperaturePredictionAccuracy = Math.round(dataElement.SARIMA);
            this.VARtemperaturePredictionAccuracy = Math.round(dataElement.VAR);
          }
          // tslint:disable-next-line:triple-equals
          if (dataElement.variables == 'cucumberMPrice') {
            this.ARMarketPricePredictionAccuracy = Math.round(dataElement.AR);
            this.ARIMAMarketPricePredictionAccuracy = Math.round(dataElement.ARIMA);
            this.ARMAMarketPricePredictionAccuracy = Math.round(dataElement.ARMA);
            this.AUTOARIMAMarketPricePredictonAccuracy = Math.round(dataElement.AUTOARIMA);
            this.RNNMarketPricePredictionAccuracy = Math.round(dataElement.RNN);
            this.SARIMAMarketPricePredictionAccuracy = Math.round(dataElement.SARIMA);
            this.VARMarketPricePredictionAccuracy = Math.round(dataElement.VAR);
          }
        }

      }
    );
  }



}
