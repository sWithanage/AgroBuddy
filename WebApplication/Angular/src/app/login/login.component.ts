import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  Customer: any[];
  constructor(
    private connectionService: AuthenticationService) { }

  loginform = true;
  recoverform = false;
  username: any;
  password: any;
  public unameEmpty;
  public passwordEmpty;

  validator(value: any) {
    // tslint:disable-next-line:triple-equals
    if (String(value).length == 0) {
      return false;
    }

    // tslint:disable-next-line:triple-equals
    if (String(value) == 'undefined') {
      return false;
    }
    return true;
  }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  onSubmit(value: any) {
    console.log(value);
    this.connectionService.addcustomer(value);
    // tslint:disable-next-line:max-line-length
    this.connectionService.addcustomer(value).subscribe(data => this.authenticateUser(data, value), error => alert('There is a error in login. please try again later.'));
  }

  authenticateUser(authenticated: boolean, value: any) {
    if (authenticated) {
      console.log('Authenticated the user. its working.');
    } else {

    }
  }
}
