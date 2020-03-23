import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private serviceHttp: HttpClient) { }
  private Customer: any[];

  private url = 'http://localhost:8080/';
  users(value: any) {
    console.log(value);
    return this.serviceHttp.post<boolean> ('http://localhost:8080/users', value);
  }
  addcustomerLogin(value: any) {
    console.log(value);
    return this.serviceHttp.post<boolean>('http://localhost:8080/authentication', value);
  }
}

