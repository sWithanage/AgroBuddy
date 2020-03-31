import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IcurrentWeather } from './currentWeather';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  
  private _url: string = 'http://localhost:8080/prediction/weather ';

  //to use http in this service class,
  //declaring http in the constructor
  constructor(private http: HttpClient) { }

  //method returning the current weather data
  getCurrentWeather(): Observable<IcurrentWeather[]>{
    return this.http.get<IcurrentWeather[]>(this._url);
  }
}
