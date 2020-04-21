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

  // method returning the current weather data
  getCurrentWeather(): Observable<IcurrentWeather[]> {
    return this.http.get<IcurrentWeather[]>('https://agrobuddybackend.nn.r.appspot.com/prediction/weather');
  }
  getPlantDetails(cropId: any): Observable<CropDetails[]> {
    return this.http.get<CropDetails[]>('https://agrobuddybackend.nn.r.appspot.com/crops/' + cropId);
  }
  getPlants(): Observable<CropDetails[]> {
    return this.http.get<CropDetails[]>('https://agrobuddybackend.nn.r.appspot.com/crops');
  }
  getMarketPrice(): Observable<MarketPriceData[]> {
    return this.http.get<MarketPriceData[]>('https://agrobuddybackend.nn.r.appspot.com/prediction/marketprice');
  }
  contact(value: any) {
    console.log(value);
    return this.http.post<boolean> ('https://agrobuddybackend.nn.r.appspot.com/contact', value);
  }
}
