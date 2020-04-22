import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IcurrentWeather } from './currentWeather';
import { Observable } from 'rxjs/Observable';
import {CropDetails} from './crop.model';
import {MarketPriceData} from './market-price-data.model';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  // to use http in this service class,
  // declaring http in the constructor
  constructor(private http: HttpClient) { }

  private url = 'https://agrobuddybackend.nn.r.appspot.com/';

  // method returning the current weather data
  getCurrentWeather(): Observable<IcurrentWeather[]> {
    return this.http.get<IcurrentWeather[]>(this.url + 'prediction/weather');
  }
  getPlantDetails(plantName: any): Observable<CropDetails[]> {
    return this.http.get<CropDetails[]>(this.url + 'crops/' + plantName);
  }
  getPlants(): Observable<CropDetails[]> {
    return this.http.get<CropDetails[]>(this.url + 'crops');
  }
  getMarketPrice(): Observable<MarketPriceData[]> {
    return this.http.get<MarketPriceData[]>(this.url + 'prediction/marketprice');
  }
  contact(value: any) {
    console.log(value);
    return this.http.post<boolean> (this.url + 'contact', value);
  }
}
