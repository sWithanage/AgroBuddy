import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {modelDetails} from './prediction-model.model';
import { WeatherDetails } from './weathercard.model';
import {ClientDetails} from './client.model';
import {CropDetails} from './crop.model';
import { IcurrentWeather } from './currentWeather';
import {MarketPriceData} from './market-price-data.model';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private serviceHttp: HttpClient) { }
  private url = 'https://agrobuddybackend.nn.r.appspot.com/';


  //
  // getVehicleList(): Observable<WeatherDetails[]> {
  //   return this.serviceHttp.get<WeatherDetails[]>(this.url + 'weatherData');
  // }
  getUserList(): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>(this.url + 'usersDetails');
  }
  getCropDetails(): Observable<WeatherDetails[]> {
    return this.serviceHttp.get<WeatherDetails[]>(this.url + 'weatherData');
  }
  getPlantDetails(plantName: any): Observable<CropDetails[]> {
    return this.serviceHttp.get<CropDetails[]>(this.url + 'crops/' + plantName);
  }
  getAllPlants(): Observable<CropDetails[]> {
    return this.serviceHttp.get<CropDetails[]>(this.url + 'crops');
  }
  getAllModels(): Observable<modelDetails[]> {
    return this.serviceHttp.get<modelDetails[]>(this.url + 'accuracy');
  }
  getModelDetails(variables: string): Observable<modelDetails[]> {
    return this.serviceHttp.get<modelDetails[]>(this.url + 'accuracy/' + variables);
  }

  availability(activeModel: any) {
    console.log(activeModel);
    return this.serviceHttp.post<boolean> (this.url + 'availableModel', activeModel);
  }

  updateUserType(userIdToChange: any, userTypeToChange: any) {
    console.log(userIdToChange + '' + userTypeToChange);
    return this.serviceHttp.put<boolean>(this.url + 'users', {
      user_Type: userTypeToChange,
      user_Id: userIdToChange,
    });
  }
  updateUserAll(user_Id: number, value: any ) {
    console.log(user_Id , value);
    return this.serviceHttp.put<boolean>(this.url + 'users/', user_Id, value  );
    console.log(user_Id);
  }
  deleteUserDetails(userIdToChange: any) {
    console.log(userIdToChange);
    return this.serviceHttp.delete<any> (this.url + 'usersDetails', userIdToChange );

  }

  //method returning the current weather details
  getCurrentWeather(): Observable<IcurrentWeather[]> {
    return this.serviceHttp.get<IcurrentWeather[]>(this.url + 'prediction/weather ');
  }


  getUserListById(user_Id: any): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>(this.url + 'users/' + user_Id);
  }
  addPlant(value: any): Observable<modelDetails[]> {
    console.log(value);
    return this.serviceHttp.post<any> (this.url + 'crops', value);
  }
  deletePlant(cropId: string) {
    console.log(cropId);
    return this.serviceHttp.delete<string> (this.url + 'crops');

  }
  updatePlant(value: any) {
    console.log(value);
    return this.serviceHttp.put<boolean> ( this.url + 'crops' , value  );
    console.log(value);
  }
  getMarketPrice(): Observable<MarketPriceData[]> {
    return this.serviceHttp.get<MarketPriceData[]>(this.url + 'prediction/marketprice');
  }

}
