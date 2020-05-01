import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from '../authentication.service';
import {ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  Customer: any[];
  constructor(
    private connectionService: AuthenticationService, private cookie: CookieService, private router: Router) { }

  loginform = true;
  recoverform = false;
  username: any;
  password: any;
  public unameEmpty;
  public passwordEmpty;
  randomKey = Math.random().toString(36).substring(2, 15);
  logginError = false;
  /*-----return false if text fields are empty-------*/
  validator(value: any) {
    // tslint:disable-next-line:triple-equals
    if (String(value).length == 0) {
      return false;
    }

    /*-----return false if text is undefined-------*/
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

  /*-----------get user name and password from loginform and send it to service class ---*/
  onSubmit(value: any) {
    // tslint:disable-next-line:max-line-length
    this.connectionService.addcustomerLogin(value).subscribe(data => this.authenticateUser(data), error => alert('There is a error in login. please try again later.'));
  }
  /*---------------------authenticate user ----------------------------*/
  authenticateUser(authenticated: any) {
    // tslint:disable-next-line:triple-equals
    if (authenticated == false || authenticated == null) {
      this.logginError = true;
    } else {
      this.cookie.set('user_Id', authenticated.user_Id);
      this.cookie.set('user_Type', authenticated.user_Type);
      this.cookie.set('user_Fname', authenticated.user_Fname);
      this.cookie.set('user_Lname', authenticated.user_Lname);
      this.cookie.set('user_Username', authenticated.user_Username);
      this.cookie.set('user_Email', authenticated.user_Email);
      this.cookie.set('authKey', this.randomKey);

      /*---------------------if user type is user navigate to client dashboard ----------------------------*/
      // tslint:disable-next-line:triple-equals
      if (authenticated.user_Type == 'user') {
        this.router.navigate(['/client/dashboard']);
        alert('Successfully Log In!');
        /*---------------------if user type is navigate navigate to admin dashboard -----------------------*/
        // tslint:disable-next-line:triple-equals
      } else if (authenticated.user_Type == 'admin') {
        this.router.navigate(['/admin/dashboard']);
        alert('Successfully Log In');
        /*--------------if user type is not equals to admin or user show error message --------------------*/
      } else {
        alert('Log In failed!.Please check your user name and password..');
      }
    }
  }
}

// saman
// saman123
