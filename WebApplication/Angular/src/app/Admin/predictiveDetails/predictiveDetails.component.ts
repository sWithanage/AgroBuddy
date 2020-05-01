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
  activeModel: string;
  id: number;
  value1: any;
  user: any;
  status: any;
  selectedOption: any;
  status_values: any = ['ARIMA', 'ARMA', 'SARIMA', 'RNN', 'AR', 'VAR', 'AUTOARIMA'];
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
          }
        }
      });
  }
  /*-------- get changed model name and variable name and send it to service class to update----------*/
  setModelData(variable: any, selectedOption: string) {
    this.connectionService.updateActivatedModel( variable, selectedOption).subscribe(
      data => window.location.reload());
  }




}
