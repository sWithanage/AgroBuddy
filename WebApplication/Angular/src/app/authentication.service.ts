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

  /*-------------post users details -------------------*/
  users(value: any) {
    return this.serviceHttp.post<boolean> (this.url + 'users', value);
  }

  /*-------------post username and password -------------------*/
  addcustomerLogin(value: any) {
    return this.serviceHttp.post<any>(this.url + 'authentication', value);
  }
  session(value: any) {
    return this.serviceHttp.post<any>(this.url + 'session', value);
  }
  getUserList(): Observable<ClientDetails[]> {
    return this.serviceHttp.get<ClientDetails[]>(this.url + 'usersDetails');
  }
  /*-------------post email to reset password-----------------*/
  resetPassword(value: any) {
    return this.serviceHttp.post<any>(this.url + 'resetpassword', value);
  }

  updatePassword(value: any, pin: any, email: any) {
    return this.serviceHttp.post<any>(this.url + 'newpassword', {'pin': pin, 'email': email, 'password': value['password']});
  }

}

