import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IcurrentWeather } from './currentWeather';
import { Observable } from 'rxjs/Observable';
import {CropDetails} from './crop.model';
import {MarketPriceData} from './market-price-data.model';
import {BestCrop} from './best-crop.model';
import {ClientArea} from './client-area.model';
import {Buyers} from './buyers.model';
import {Diseases} from './diseases.model';

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
  getDiseases(plantName: any): Observable<Diseases[]> {
    return this.http.get<Diseases[]>(this.url + 'diseases/' + plantName);
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
  predict(value: any) {
    console.log(value);
    return this.http.post<boolean> (this.url + 'predict', value);
  }
  getBestCrop(): Observable<BestCrop[]> {
    return this.http.get<BestCrop[]>(this.url + 'bestCrops');
  }
  chosenCrop(value: any) {
    console.log(value);
    return this.http.post<boolean> (this.url + 'chosenCrop', value);
  }
  clientArea(userId: any): Observable<ClientArea[]> {
    return this.http.get<ClientArea[]>(this.url + 'cultivatedarea/' + userId);
  }
  getBuyers(): Observable<Buyers[]> {
    return this.http.get<Buyers[]>(this.url + 'buyers');
  }
  sendEmail(data: any) {
    return this.http.post(this.url + 'sendmail', data);
  }
  getArea(): Observable<ClientArea[]> {
    return this.http.get<ClientArea[]>(this.url + 'cultivatedarea');
  }
}
