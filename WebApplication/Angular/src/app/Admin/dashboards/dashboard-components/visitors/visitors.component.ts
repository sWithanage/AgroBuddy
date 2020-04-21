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


    constructor(private connectionService: AdminServiceService, private route: ActivatedRoute) {
    }

  ngOnInit() {

    this.connectionService.getModelDetails(this.variables).subscribe(
      data => {
        console.log(data);
        if (this.variables = 'temperature') {
          this.ARIMAmodel = data[0].ARIMA;
          this.ANNmodel = data[0].ANN;
          this.ARMAmodel = data[0].ARMA;
          this.RNNmodel = data[0].RNN;
          this.SARIMAmodel = data[0].SARIMA;
        }
      }
    );
    // this.connectionService.getAllModels().subscribe(
    //   data => {
    //     console.log(data);
    //     this.modelDetails = data;
    //     this.variable = data[0].variables;
    //     console.log(this.variable);
    //     this.ARIMAmodel = data[0].ARIMA;
    //     this.ARMAmodel = data[0].ARMA;
    //     this.SARIMAmodel = data[0].SARIMA;
    //     this.RNNmodel = data[0].RNN;
    //     this.ANNmodel = data[0].ANN;
    //     this.id = data[0].aID;
    //     this.status = data[0].activeModel;
    //     this.selectedOption = data[0].activeModel;
    //   });

  }



}
