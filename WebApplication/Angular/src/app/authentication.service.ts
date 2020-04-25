import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ClientDetails} from './client.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private serviceHttp: HttpClient) { }
  private Customer: any[];
  private url = 'https://agrobuddybackend.nn.r.appspot.com/';

  users(value: any) {
    return this.serviceHttp.post<boolean> (this.url + 'users', value);
  }
  addcustomerLogin(value: any) {
    return this.serviceHttp.post<any>(this.url + 'authentication', value);
  }
  session(value: any) {
    return this.serviceHttp.post<any>(this.url + 'session', value);
  }
  getUserList(): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>(this.url + 'usersDetails');
  }

}

