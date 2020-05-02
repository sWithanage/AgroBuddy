import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminServiceService} from '../../admin-service.service';
@Component({
  selector: 'app-topsell',
  templateUrl: './predictiveDetails.component.html'
})
export class PredictiveDetailsComponent implements OnInit {
  model: any[];
  variables: string;
  modelDetails: any[];
  modelName: string;
  variable: string;
  ARIMAmodel: string;
  ARMAmodel: string;
  SARIMAmodel: string;
  RNNmodel: string;
  ARmodel: string;
  VARmodel: string;
  AUTOARIMA: string;
  ratio: any;
  activeModel: string;
  id: number;
  value1: any;
  user: any;
  status: any;
  selectedratio: any;
  selectedOption: any;
  selectedOption2: any;
  status_values: any = ['ARIMA', 'ARMA', 'SARIMA', 'RNN', 'AR', 'VAR', 'AUTOARIMA'];
  status_values2: any = ['90%', '80%', '70%', '60%', '50%', '40%'];
  noteMessage = '';

  constructor(private connectionService: AdminServiceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /*-------- get variable name from previous page----------*/
    this.route.queryParams
      .filter(params => params.variables)
      .subscribe(params => {

        this.variable = params.variables;
        // tslint:disable-next-line:triple-equals
        if (this.variable == 'rainfall') {
          this.noteMessage = '(Mean Squared Error)';
        }
      });
    /*-------- get all model details and assign----------*/
    this.connectionService.getAllModels().subscribe(
      data => {

        for (const dataElement of data) {
          console.log(data);
          // tslint:disable-next-line:triple-equals
          if (dataElement.variables == this.variable) {
            this.modelDetails = data;
            this.variable = dataElement.variables;
            this.ARIMAmodel = String(Math.round(dataElement.ARIMA * 1000) / 1000);
            this.ARMAmodel = String(Math.round(dataElement.ARMA * 1000) / 1000);
            this.SARIMAmodel = String(Math.round(dataElement.SARIMA * 1000) / 1000);
            this.RNNmodel = String(Math.round(dataElement.RNN * 1000) / 1000);
            this.AUTOARIMA = String(Math.round(dataElement.AUTOARIMA * 1000) / 1000);
            this.ARmodel = String(Math.round(dataElement.AR * 1000) / 1000);
            this.VARmodel = String(Math.round(dataElement.VAR * 1000) / 1000);
            this.id = dataElement.aID;
            this.status = dataElement.activeModel;
            this.selectedOption = dataElement.activeModel;
            // tslint:disable-next-line:triple-equals
            if (dataElement.ratio == 0.1) {
              this.ratio = '90%' ;
              // tslint:disable-next-line:triple-equals
            } else if (dataElement.ratio == 0.2) {
              this.ratio = '80%';
              // tslint:disable-next-line:triple-equals
            } else if (dataElement.ratio == 0.3) {
              this.ratio = '70%' ;
              // tslint:disable-next-line:triple-equals
            } else if (dataElement.ratio == 0.4) {
              this.ratio = '60%' ;
              // tslint:disable-next-line:triple-equals
            } else if (dataElement.ratio == 0.5) {
              this.ratio = '50%' ;
              // tslint:disable-next-line:triple-equals
            } else if (dataElement.ratio == 0.6) {
              this.ratio = '40%' ;
            }
            this.selectedOption2 = this.ratio;
            this.selectedratio = this.ratio;
            console.log(this.selectedOption2);
          }
        }
      });
  }
  /*-------- get changed model name and variable name and send it to service class to update----------*/
  setModelData(variable: any, selectedOption: string) {
    this.connectionService.updateActivatedModel( variable, selectedOption).subscribe(
      data => window.location.reload());
  }

  /*-------- get changed ratio value and variable name and send it to service class to update----------*/
  setRatioData(variable: any, selectedOption2: any) {
    // tslint:disable-next-line:triple-equals
    if (selectedOption2 == '90%') {
      selectedOption2 = 0.1;
      // tslint:disable-next-line:triple-equals
    } else if (selectedOption2 == '80%') {
      selectedOption2 = 0.2;
      // tslint:disable-next-line:triple-equals
    } else if (selectedOption2 == '70%') {
      selectedOption2 = 0.3;
      // tslint:disable-next-line:triple-equals
    } else if (selectedOption2 == '60%') {
      selectedOption2 = 0.4;
      // tslint:disable-next-line:triple-equals
    } else if (selectedOption2 == '50%') {
      selectedOption2 = 0.5;
      // tslint:disable-next-line:triple-equals
    } else if (selectedOption2 == '40%') {
      selectedOption2 = 0.6;
    }

    console.log(variable, selectedOption2);
    this.connectionService.updateRatioStatus( variable, selectedOption2).subscribe(
      data => window.location.reload());
  }
}
