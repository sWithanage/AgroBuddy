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
import {BestCropPoints} from './best-crop-points.model';

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
  // method returning plant details on selected plant
  getPlantDetails(plantName: any): Observable<CropDetails[]> {
    return this.http.get<CropDetails[]>(this.url + 'crops/' + plantName);
  }
  // method returning diseases on selected plant
  getDiseases(plantName: any): Observable<Diseases[]> {
    return this.http.get<Diseases[]>(this.url + 'diseases/' + plantName);
  }
  // get all plants from database
  getPlants(): Observable<CropDetails[]> {
    return this.http.get<CropDetails[]>(this.url + 'crops');
  }
  // get market prices
  getMarketPrice(): Observable<MarketPriceData[]> {
    return this.http.get<MarketPriceData[]>(this.url + 'prediction/marketprice');
  }
  // post contact us form details to database
  contact(value: any) {
    return this.http.post<boolean> (this.url + 'contact', value);
  }
  // post contact us form details to send confirmation emails
  sendEmail(data: any) {
    return this.http.post(this.url + 'sendmail', data);
  }
  // get cultivated areas
  getArea(): Observable<ClientArea[]> {
    return this.http.get<ClientArea[]>(this.url + 'cultivatedarea');
  }
  // get cultivated areas on given user Id
  clientArea(userId: any): Observable<ClientArea[]> {
    return this.http.get<ClientArea[]>(this.url + 'cultivated/' + userId);
  }
  // get buyers details
  getBuyers(): Observable<Buyers[]> {
    return this.http.get<Buyers[]>(this.url + 'buyers');
  }
  predict(value: any) {
    return this.http.post<boolean> (this.url + 'details', value);
  }
  getBestCrop(): Observable<BestCropPoints[]> {
    return this.http.get<BestCropPoints[]>(this.url + 'bestcrop');
  }
  chosenCrop(value: any) {
    return this.http.post<boolean> (this.url + 'area', value);
  }
}
