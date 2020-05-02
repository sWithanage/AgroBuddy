import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminServiceService} from '../admin-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: any;
  loginform = true;
  recoverform = false;
  passwordform = false;
  username: any;
  password: any;
  confirm: any;
  pin: any;
  public passwordError;
  public confirmEmpty;
  public doesnotsuitEmpty;
  public unameEmpty;
  public passwordEmpty;
  public emailEmpty;
  public errormassage;
  // tslint:disable-next-line:max-line-length
  constructor(private connectionService: AuthenticationService, private cookie: CookieService, private router: Router, private route: ActivatedRoute) { }
  logginError = false;
  errorMessage: any;
  ngOnInit() {

  }

  onSubmitNewPassword( password: any) {
    this.route.queryParams
      .filter(params => params.token)
      .subscribe(params => {
        this.pin = params.token;
        this.email = params.email;
      });

    // tslint:disable-next-line:triple-equals
    if (this.pin.length == 0) {
      this.errorMessage = 'Url session out!';
      // tslint:disable-next-line:triple-equals
    } else if (this.email.length == 0) {
      this.errorMessage = 'Required parameters are not found!';
      // tslint:disable-next-line:triple-equals
    } else if (password['repass'] != password['password']) {
      this.errorMessage = 'Passwords should be same!';
    } else if (password['password'].length <= 8) {
      this.errorMessage = 'Password required minimum 8 characters!';
    } else {
      this.errorMessage = '';
      // tslint:disable-next-line:max-line-length
      this.connectionService.updatePassword(password, this.pin, this.email).subscribe(data => this.authenticatePin(data), error => alert('There is a error in submiting. please try again later.'));
    }
  }
  authenticatePin(authenticated: any) {
    // tslint:disable-next-line:triple-equals
    if (authenticated == false || authenticated == null) {
      alert('password is not changed! Please try again later');
    } else {
      this.router.navigate(['/login']);
    }
  }

}
