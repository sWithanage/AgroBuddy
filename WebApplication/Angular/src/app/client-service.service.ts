import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IcurrentWeather } from './currentWeather';
import { Observable } from 'rxjs/Observable';
import {CropDetails} from './crop.model';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  // to use http in this service class,
  // declaring http in the constructor
  constructor(private http: HttpClient) { }

  // method returning the current weather data
  getCurrentWeather(): Observable<IcurrentWeather[]> {
    return this.http.get<IcurrentWeather[]>('http://localhost:8080/prediction/weather');
  }
  getPlantDetails(plantName: any): Observable<CropDetails[]> {
    return this.http.get<CropDetails[]>('http://localhost:8080/crops/' + plantName);
  }
  getPlants(): Observable<CropDetails[]> {
    return this.http.get<CropDetails[]>('http://localhost:8080/crops');
  }
}
