import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import { AdminServiceService } from 'src/app/admin-service.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weathercard.component.html'
})
export class WeathercardComponent implements OnInit {
  weather: any[];
  topic;

  public currentWeather = [];

  constructor(private _weatherService: AdminServiceService) { }

  ngOnInit() {

    //using the service instance and fetching the weather data
    this._weatherService.getCurrentWeather()
      .subscribe(data => this.currentWeather = data);   //assigns the data recieved from the observable into local currentweathr property

    // tslint:disable-next-line:comment-format
    //this.connectionService.getWeatherData().subscribe(
     // data => {
      //  this.weather = data;
     // });


  }
  // tslint:disable-next-line:member-ordering
    today: number = Date.now();
  // tslint:disable-next-line:member-ordering
    location: Location;
}

