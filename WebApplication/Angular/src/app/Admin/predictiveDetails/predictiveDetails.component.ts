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

  constructor(private connectionService: AdminServiceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.connectionService.getAllModels().subscribe(
    //   data => {
    //     this.model = data;
    //     console.log(data);
    //   });

    this.route.queryParams
      .filter(params => params.variables)
      .subscribe(params => {

        this.variable = params.variables;
      });

    this.connectionService.getAllModels().subscribe(
      data => {
         console.log(data);

        for (const dataElement of data) {
          // tslint:disable-next-line:triple-equals
          if (dataElement.variables == this.variable) {
            this.modelDetails = data;
            this.variable = dataElement.variables;
            this.ARIMAmodel = dataElement.ARIMA;
            this.ARMAmodel = dataElement.ARMA;
            this.SARIMAmodel = dataElement.SARIMA;
            this.RNNmodel = dataElement.RNN;
            this.AUTOARIMA = dataElement.AUTOARIMA;
            this.ARmodel = dataElement.AR;
            this.VARmodel = dataElement.VAR;
            this.id = dataElement.aID;
            this.status = dataElement.activeModel;
            this.selectedOption = dataElement.activeModel;
          }
        }
      });
  }

  setModelData(variable: any, selectedOption: string) {
    console.log(variable + ' ' + selectedOption);
    this.connectionService.updateActivatedModel( variable, selectedOption).subscribe(
      data => console.log(variable, selectedOption));
  }




}
