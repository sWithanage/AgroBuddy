import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PredictionModel} from './prediction-model.model';
import { WeatherDetails } from './weathercard.model';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private serviceHttp: HttpClient) { }

  getSelectedModel(): Observable<PredictionModel[]> {
    return this.serviceHttp.get<PredictionModel[]>('http://localhost:8080/selectedModel');
  }

  getVehicleList(): Observable<WeatherDetails[]> {
    return this.serviceHttp.get<WeatherDetails[]>('http://localhost:8080/weatherData');
  }

}
