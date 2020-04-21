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
  ANNmodel: string;
  activeModel: string;
  id: number;
  value1: any;
  user: any;
  status: any;
  selectedOption: any;
  status_values: any = ['ARIMA', 'ARMA', 'SARIMA', 'RNN', 'ANN'];

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
        this.modelDetails = data;
        this.variable = data[0].variables;
        console.log(this.variable);
        this.ARIMAmodel = data[0].ARIMA;
        this.ARMAmodel = data[0].ARMA;
        this.SARIMAmodel = data[0].SARIMA;
        this.RNNmodel = data[0].RNN;
        this.ANNmodel = data[0].ANN;
        this.id = data[0].aID;
        this.status = data[0].activeModel;
        this.selectedOption = data[0].activeModel;
      });
  }

  setModelData( variableToChange: any) {
    console.log(this.selectedOption + ' ' + variableToChange);
  }
  // updateCheck(activeModel: any) {
  //   if (this.theCheckbox1 = true) {
  //     this.connectionService.availability(activeModel).subscribe(
  //       data => console.log(data)
  //     );
  //   } else if (this.theCheckbox2 = true) {
  //     this.connectionService.availability(activeModel).subscribe(
  //       data => console.log(data)
  //     );
  //   } else if (this.theCheckbox3 = true) {
  //     this.connectionService.availability(activeModel).subscribe(
  //       data => console.log(data)
  //     );
  //   } else if (this.theCheckbox4) {
  //     this.connectionService.availability(activeModel).subscribe(
  //       data => console.log(data)
  //     );
  //   } else if (this.theCheckbox5 = true) {
  //     this.connectionService.availability(activeModel).subscribe(
  //       data => console.log(data)
  //     );
  //   }
  //
  //   // Page eka refresh karnawa.
  // }



}
