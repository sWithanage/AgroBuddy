import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../authentication.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-weather',
  templateUrl: './weathercard.component.html'
})
export class WeathercardComponent implements OnInit {
  weather: any[];
  topic;

  constructor(private connectionService: AuthenticationService) { }

  ngOnInit() {
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

