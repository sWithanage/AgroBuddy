import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
    // tslint:disable-next-line:max-line-length
    this.connectionService.addcustomerLogin(value).subscribe(data => this.authenticateUser(data), error => alert('There is a error in login. please try again later.'));
  }

  authenticateUser(authenticated: any) {
    console.log(authenticated);
    if (authenticated == true) {
      console.log('Successfully Log In!.....');
    } else {
    console.log('Invalid password!..Try again');
    }
  }
}
