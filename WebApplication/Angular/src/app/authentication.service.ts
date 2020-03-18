import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private serviceHttp: HttpClient) { }

  addcustomer(value: any) {
    return this.serviceHttp.post<any> ('http://localhost:8080/register', value);
  }
  addcustomerLogin(value: any) {
    return this.serviceHttp.post<any> ('http://localhost:8080/login', value);
  }
}

