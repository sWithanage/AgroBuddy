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
import {RainfallData} from './rainfall-data.model';
import {Diseases} from './diseases.model';
import {Buyers} from './buyers.model';



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
  getAllUserById(user_Id: any): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>(this.url + 'users/'+ user_Id);
  }
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
  updateUserAll(value: any, user_Id: number ) {
    return this.serviceHttp.put<boolean>(this.url +  'usersDetails', value  );
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
  updateActivatedModel(variable: any, selectedOption: any) {
    console.log(variable, selectedOption);
    return this.serviceHttp.put<boolean>(this.url + 'accuracy', {
      status: selectedOption,
      variables: variable,
    });

  }
  getRainfallData(): Observable<RainfallData[]> {
    return this.serviceHttp.get<RainfallData[]>(this.url + 'prediction/rainfall');
  }

  getTemperatureData(): Observable<WeatherDetails[]> {
    return this.serviceHttp.get<WeatherDetails[]>(this.url + 'prediction/temperature');
  }
  getDiseaseDetails(crop_Id: any): Observable<Diseases[]> {
    return this.serviceHttp.get<Diseases[]>(this.url + 'diseases/' + crop_Id);
  }
  getDiseaseListById(disease_Id: any): Observable<Diseases[]> {
    return this.serviceHttp.get<Diseases[]>(this.url + 'diseases/' + disease_Id);
  }
  deleteDiseaseDetails(disease_id: any) {
    console.log(disease_id);
    return this.serviceHttp.delete<any> (this.url + 'diseases', disease_id );

  }
  updateDiseaseAll(value: any, disease_Id: any) {
    console.log(disease_Id , value);
    return this.serviceHttp.put<boolean>(this.url +  'diseases', value  );
    console.log(disease_Id);
  }
  addDisease(value: any): Observable<Diseases[]> {
    console.log(value);
    return this.serviceHttp.post<any> (this.url + 'diseases', value);
  }
  getBuyersList(): Observable<Buyers[]> {
    return this.serviceHttp.get<Buyers[]>(this.url + 'buyers');
  }
  getPlantListById(crop_Id: any): Observable<CropDetails[]> {
    return this.serviceHttp.get<CropDetails[]>(this.url + 'crops/' + crop_Id);
  }
  getBuyerListById(buyerId: any): Observable<Buyers[]> {
    return this.serviceHttp.get<Buyers[]>(this.url + 'buyers/' + buyerId);
  }
  deleteBuyerDetails(buyerId: any) {
    console.log(buyerId);
    return this.serviceHttp.delete<any>(this.url + 'buyers', buyerId);
  }
  updateBuyerAll(value: any, buyerId: any) {
    return this.serviceHttp.put<boolean>(this.url +  'buyers', value  );
    console.log(buyerId);
  }
  addBuyer(value: any): Observable<Buyers[]> {
  console.log(value);
  return this.serviceHttp.post<any> (this.url + 'buyers', value);
}
  }
