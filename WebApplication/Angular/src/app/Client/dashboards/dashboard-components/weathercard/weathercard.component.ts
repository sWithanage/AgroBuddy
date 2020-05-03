import {Component, OnInit} from '@angular/core';
import {WeatherDetails} from '../../../../weathercard.model';
import { ClientServiceService } from 'src/app/client-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weathercard.component.html'
})
export class WeathercardComponent implements OnInit {

  weather: WeatherDetails[];
  // tslint:disable-next-line:max-line-length
  constructor(private connectionService: ClientServiceService) { }

  today: number = Date.now(); // get the current date and time

  ngOnInit() {
    // using the service instance and fetching the weather data
    this.connectionService.getCurrentWeather()  // get current weather
      .subscribe(data => this.weather = data);   // assigns the data received from the observable into local currentweather property
  }
}
