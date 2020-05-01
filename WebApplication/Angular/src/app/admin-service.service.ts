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
import {ClientArea} from './client-area.model';



@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private serviceHttp: HttpClient) { }
  // private url = 'http://localhost:8080/';
  private url = 'https://agrobuddybackend.nn.r.appspot.com/';

  /*---------------------get user details according to user's ID--------------------------------*/
  getAllUserById(user_Id: any): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>(this.url + 'users/' + user_Id);
  }

  /*-----------------------------------get all users' details ----------------------------------*/
  getUserList(): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>(this.url + 'usersDetails');
  }

  /*------------------------------------get weather details ------------------------------------*/
  getCropDetails(): Observable<WeatherDetails[]> {
    return this.serviceHttp.get<WeatherDetails[]>(this.url + 'weatherData');
  }

  /*--------------------get plant details according to plant names using queries----------------*/
  getPlantDetails(plantName: any): Observable<CropDetails[]> {
    return this.serviceHttp.get<CropDetails[]>(this.url + 'crops/' + plantName);
  }

  /*-------------------------------------get all crop details-----------------------------------*/
  getAllPlants(): Observable<CropDetails[]> {
    return this.serviceHttp.get<CropDetails[]>(this.url + 'crops');
  }

  /*------------------------------------get all model details-----------------------------------*/
  getAllModels(): Observable<modelDetails[]> {
    return this.serviceHttp.get<modelDetails[]>(this.url + 'accuracy');
  }

  /*---------------get model details according to variable names using queries------------------*/
  getModelDetails(variables: string): Observable<modelDetails[]> {
    return this.serviceHttp.get<modelDetails[]>(this.url + 'accuracy/' + variables);
  }

  /*------------------------post current activated model to backend----------------------------*/
  availability(activeModel: any) {
    return this.serviceHttp.post<boolean> (this.url + 'availableModel', activeModel);
  }

  /*-----------------------------send updated user type to backend------------------------------*/
  updateUserType(userIdToChange: any, userTypeToChange: any) {
    return this.serviceHttp.put<boolean>(this.url + 'users', {
      user_Type: userTypeToChange,
      user_Id: userIdToChange,
    });
  }

  /*--------------------------send All updated user details to backend---------------------------*/
  updateUserAll(value: any, user_Id: number ) {
    return this.serviceHttp.put<boolean>(this.url +  'usersDetails', value  );
  }

  /*------------------------delete user's details according to user's ID--------------------------*/
  deleteUserDetails(userIdToChange: any) {
    const json = '{ "name": "John Doe"}';
    const jsonValue = JSON.parse(json);
    return this.serviceHttp.post<any> (this.url + 'deleteUser/' + userIdToChange , jsonValue );
  }

  /*--------------------------method returning the current weather details-------------------------*/
  getCurrentWeather(): Observable<IcurrentWeather[]> {
    return this.serviceHttp.get<IcurrentWeather[]>(this.url + 'prediction/weather ');
  }

  /*---------------------------get user details according to user ID-------------------------------*/
  getUserListById(user_Id: any): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>(this.url + 'users/' + user_Id);
  }

  /*---------------------send new plant details to backend for store(database)---------------------*/
  addPlant(value: any): Observable<modelDetails[]> {
    return this.serviceHttp.post<any> (this.url + 'crops', value);
  }

  /*--------------------------delete crop with details according to crop ID-----------------------*/
  deletePlant(cropId: string) {
    return this.serviceHttp.post<any> ( this.url + 'deleteCrops/' + cropId, cropId);
  }

  /*---------------------------------send updated plant details------------------------------------*/
  updatePlant(value: any) {
    return this.serviceHttp.put<boolean> ( this.url + 'crops' , value  );
  }

  /*-------------------------get market price predicted data(accuracy)-----------------------------*/
  getMarketPrice(): Observable<MarketPriceData[]> {
    return this.serviceHttp.get<MarketPriceData[]>(this.url + 'prediction/marketprice');
  }

  /*-----------------------update activated model according to variables---------------------------*/
  updateActivatedModel(variable: any, selectedOption: any) {
    return this.serviceHttp.put<boolean>(this.url + 'accuracy', {
      status: selectedOption,
      variables: variable,
    });

  }

  /*---------------------------------get rainfall predicted data -------------------------------*/
  getRainfallData(): Observable<RainfallData[]> {
    return this.serviceHttp.get<RainfallData[]>(this.url + 'prediction/rainfall');
  }

  /*--------------------------------get temperature predicted data ----------------------------*/
  getTemperatureData(): Observable<WeatherDetails[]> {
    return this.serviceHttp.get<WeatherDetails[]>(this.url + 'prediction/temperature');
  }

  /*------------------get diseases details according to crop ID using queries------------------*/
  getDiseaseDetails(crop_Id: any): Observable<Diseases[]> {
    return this.serviceHttp.get<Diseases[]>(this.url + 'diseases/' + crop_Id);
  }

  /*------------------------get disease details according to disease ID ----------------------*/
  getDiseaseListById(disease_Id: any): Observable<Diseases[]> {
    return this.serviceHttp.get<Diseases[]>(this.url + 'disease/' + disease_Id);
  }

  /*-------------------------delete disease according to disease ID---------------------------*/
  deleteDiseaseDetails(disease_id: string) {
    const json = '{ "name": "John Doe", "language": { "name": "en", "level": 5 } }';
    const jsonValue = JSON.parse(json);
    return this.serviceHttp.post<any> (this.url + 'deleteDisease/' + disease_id , jsonValue );
  }

  /*-----------------------------------update diseases's details-------------------------------*/
  updateDiseaseAll(value: any, disease_Id: any) {
    return this.serviceHttp.put<boolean>(this.url +  'diseases', value  );
  }

  /*--------------------------------------add new diseases-------------------------------------*/
  addDisease(value: any): Observable<Diseases[]> {
    return this.serviceHttp.post<any> (this.url + 'diseases', value);
  }

  /*------------------------------------get All buyers' details--------------------------------*/
  getBuyersList(): Observable<Buyers[]> {
    return this.serviceHttp.get<Buyers[]>(this.url + 'buyers');
  }

  /*------------------------------------get Log details----------------------------------------*/
  getLog(): Observable<Buyers[]> {
    return this.serviceHttp.get<Buyers[]>('http://localhost:8080/log');
  }

  /*----------------------------get crop details according to crop ID--------------------------*/
  getPlantListById(crop_Id: any): Observable<CropDetails[]> {
    return this.serviceHttp.get<CropDetails[]>(this.url + 'crops/' + crop_Id);
  }

  /*-----------------------get buyer's details according to buyer ID---------------------------*/
  getBuyerListById(buyerId: any): Observable<Buyers[]> {
    return this.serviceHttp.get<Buyers[]>(this.url + 'buyers/' + buyerId);
  }

  /*---------------------------------------delete buyer----------------------------------------*/
  deleteBuyerDetails(buyerId: string) {
    const json = '{ "name": "John Doe", "language": { "name": "en", "level": 5 } }';
    const jsonValue = JSON.parse(json);
    return this.serviceHttp.post<any> (this.url + 'deleteBuyer/' + buyerId , jsonValue );
  }

  /*---------------------------------------update buyer details--------------------------------*/
  updateBuyerAll(value: any, buyerId: any) {
    return this.serviceHttp.put<boolean>(this.url +  'buyers', {
      buyerId: buyerId,
      buyerAddress: value.buyerAddress,
      buyerName: value.buyerName,
      buyerContactNumber: value.buyerContactNumber,
    }  );
  }

  /*-------------------------add new buyer(post details about buyer)---------------------------*/
  addBuyer(value: any): Observable<Buyers[]> {
    return this.serviceHttp.post<any> (this.url + 'buyers', value);
  }

  /*-----------------------get the percentage of hall cultivated area---------------------------*/
  getArea(): Observable<ClientArea[]> {
    return this.serviceHttp.get<ClientArea[]>(this.url + 'cultivatedarea');
  }

  /*-------------------get cultivated area percentage according to user ID---------------------*/
  clientArea(userId: any): Observable<ClientArea[]> {
    return this.serviceHttp.get<ClientArea[]>(this.url + 'cultivated/' + userId);
  }

  /*-----------------------get the percentage of hall cultivated area---------------------------*/
  contact(value: any) {
    return this.serviceHttp.post<boolean> (this.url + 'contact', value);
  }
  // post contact us form details to send confirmation emails
  sendEmail(data: any) {
    return this.serviceHttp.post(this.url + 'send/email', data);
  }
  }
