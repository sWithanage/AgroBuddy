import {OnInit, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: 'plant-details.component.html'
})
export class PlantDetailsComponent implements OnInit {
  // Dynamic parameters for this component's route: /example-params/:first/:second
  routeParams: Params;

  // Query parameters found in the URL: /example-params/one/two?query1=one&query2=two
  queryParams: Params;
  ngOnInit(): void {
  }
}
