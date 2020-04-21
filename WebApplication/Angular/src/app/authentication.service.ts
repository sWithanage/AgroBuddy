import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private serviceHttp: HttpClient) { }
  private Customer: any[];
  private url = 'https://agrobuddybackend.nn.r.appspot.com/';

  users(value: any) {
    console.log(value);
    return this.serviceHttp.post<boolean> (this.url + 'users', value);
  }
  addcustomerLogin(value: any) {
    console.log(value);
    return this.serviceHttp.post<boolean>(this.url + 'authentication', value);
  }
}

