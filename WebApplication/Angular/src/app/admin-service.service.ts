import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {modelDetails} from './prediction-model.model';
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
  getAllModels(): Observable<modelDetails[]> {
    return this.serviceHttp.get<modelDetails[]>('http://localhost:8080/accuracy');
  }
  getModelDetails(variables: string): Observable<modelDetails[]> {
    return this.serviceHttp.get<modelDetails[]>('http://localhost:8080/accuracy/' + variables);
  }

  availability(activeModel: any) {
    console.log(activeModel);
    return this.serviceHttp.post<boolean> ('http://localhost:8080/availableModel', activeModel);
  }

  //method returning the current weather details
  getCurrentWeather(): Observable<IcurrentWeather[]>{
    return this.serviceHttp.get<IcurrentWeather[]>('http://localhost:8080/prediction/weather ');
  }

}
