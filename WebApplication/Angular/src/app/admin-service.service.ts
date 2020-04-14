import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PredictionModel} from './prediction-model.model';
import { WeatherDetails } from './weathercard.model';
import {ClientDetails} from './client.model';
import {CropDetails} from './crop.model';
import { IcurrentWeather } from './currentWeather';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private serviceHttp: HttpClient) { }
  private url = 'http://localhost:8080/';

  // getSelectedModel(): Observable<PredictionModel[]> {
  //   return this.serviceHttp.get<PredictionModel[]>('http://localhost:8080/selectedModel');
  // }
  //
  // getVehicleList(): Observable<WeatherDetails[]> {
  //   return this.serviceHttp.get<WeatherDetails[]>('http://localhost:8080/weatherData');
  // }
  getUserList(): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>('http://localhost:8080/usersDetails');
  }
  getCropDetails(): Observable<WeatherDetails[]> {
    return this.serviceHttp.get<WeatherDetails[]>('http://localhost:8080/weatherData');
  }
  getPlantDetails(plantName: any): Observable<CropDetails[]> {
    return this.serviceHttp.get<CropDetails[]>('http://localhost:8080/crops/' + plantName);
  }
  getAllPlants(): Observable<CropDetails[]> {
    return this.serviceHttp.get<CropDetails[]>('http://localhost:8080/crops');
  }

  //method returning the current weather details
  getCurrentWeather(): Observable<IcurrentWeather[]>{
    return this.serviceHttp.get<IcurrentWeather[]>('http://localhost:8080/prediction/weather ');
  }

}
