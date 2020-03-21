import {Component} from '@angular/core';
import {WeatherDetails} from '../../../../weathercard.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weathercard.component.html'
})
export class WeathercardComponent {
  weather: WeatherDetails;
  constructor() {}
  today: number = Date.now();
}
