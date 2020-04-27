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
  // private url = 'http://localhost:8080/';
  private url = 'https://agrobuddybackend.nn.r.appspot.com/';


  //
  // getVehicleList(): Observable<WeatherDetails[]> {
  //   return this.serviceHttp.get<WeatherDetails[]>(this.url + 'weatherData');
  // }
  getAllUserById(user_Id: any): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>(this.url + 'users/' + user_Id);
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
    return this.serviceHttp.post<boolean> (this.url + 'availableModel', activeModel);
  }

  updateUserType(userIdToChange: any, userTypeToChange: any) {
    return this.serviceHttp.put<boolean>(this.url + 'users', {
      user_Type: userTypeToChange,
      user_Id: userIdToChange,
    });
  }
  updateUserAll(value: any, user_Id: number ) {
    return this.serviceHttp.put<boolean>(this.url +  'usersDetails', value  );
  }

  deleteUserDetails(userIdToChange: any) {
    const json = '{ "name": "John Doe"}';
    const jsonValue = JSON.parse(json);
    return this.serviceHttp.post<any> (this.url + 'deleteUser/' + userIdToChange , jsonValue );
  }

  //method returning the current weather details
  getCurrentWeather(): Observable<IcurrentWeather[]> {
    return this.serviceHttp.get<IcurrentWeather[]>(this.url + 'prediction/weather ');
  }


  getUserListById(user_Id: any): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>(this.url + 'users/' + user_Id);
  }
  addPlant(value: any): Observable<modelDetails[]> {
    return this.serviceHttp.post<any> (this.url + 'crops', value);
  }
  deletePlant(cropId: string) {
    return this.serviceHttp.post<any> ( this.url + 'deleteCrops/' + cropId, cropId);
  }
  updatePlant(value: any) {
    return this.serviceHttp.put<boolean> ( this.url + 'crops' , value  );
  }
  getMarketPrice(): Observable<MarketPriceData[]> {
    return this.serviceHttp.get<MarketPriceData[]>(this.url + 'prediction/marketprice');
  }
  updateActivatedModel(variable: any, selectedOption: any) {
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
    return this.serviceHttp.get<Diseases[]>(this.url + 'disease/' + disease_Id);
  }

  deleteDiseaseDetails(disease_id: string) {
    const json = '{ "name": "John Doe", "language": { "name": "en", "level": 5 } }';
    const jsonValue = JSON.parse(json);
    return this.serviceHttp.post<any> (this.url + 'deleteDisease/' + disease_id , jsonValue );
  }
  updateDiseaseAll(value: any, disease_Id: any) {
    return this.serviceHttp.put<boolean>(this.url +  'diseases', value  );
  }
  addDisease(value: any): Observable<Diseases[]> {
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

  deleteBuyerDetails(buyerId: string) {
    const json = '{ "name": "John Doe", "language": { "name": "en", "level": 5 } }';
    const jsonValue = JSON.parse(json);
    return this.serviceHttp.post<any> (this.url + 'deleteBuyer/' + buyerId , jsonValue );
  }
  updateBuyerAll(value: any, buyerId: any) {
    return this.serviceHttp.put<boolean>(this.url +  'buyers', {
      buyerId: buyerId,
      buyerAddress: value.buyerAddress,
      buyerName: value.buyerName,
      buyerContactNumber: value.buyerContactNumber,
    }  );
  }
  addBuyer(value: any): Observable<Buyers[]> {
  return this.serviceHttp.post<any> (this.url + 'buyers', value);
}
  }
