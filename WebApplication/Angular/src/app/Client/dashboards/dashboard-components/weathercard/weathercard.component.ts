import {Component, OnInit} from '@angular/core';
import {WeatherDetails} from '../../../../weathercard.model';
import { ClientServiceService } from 'src/app/client-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weathercard.component.html'
})
export class WeathercardComponent implements OnInit{

  weather: WeatherDetails;

  public currentWeather = [];

  constructor(private _weatherService: ClientServiceService){ }   //local variable _weatherService, gives an instance of ClientServiceService

  today: number = Date.now();

  ngOnInit(){
    //using the service instance and fetching the weather data
    this._weatherService.getCurrentWeather()
      .subscribe(data => this.currentWeather = data);   //assigns the data recieved from the observable into local currentweathr property
  }
}
