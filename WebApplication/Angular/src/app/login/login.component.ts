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
  sendCustomerLoginDetails(value: any) {
    // tslint:disable-next-line:max-line-length
   this.connectionService.addcustomerLogin(value).subscribe(data => this.authenticateUser(value), error => alert('There is a error in login. please try again later.'));

  }
  authenticateUser(value: any) {

  }
  // submit(value: any) {
  //   if (!this.validator(this.username)) {
  //     this.unameEmpty = true;
  //   } else if (!this.validator(this.password)) {
  //     this.passwordEmpty = true;
  //   } else {
  //     console.log(this.username, this.password);
  //     this.connectionService.addcustomerLogin(value).subscribe(
  //       data => console.log(data)
  //     );
  //   }
  // }
  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  onSubmit(value: any) {
    this.connectionService.addcustomer(value);
      // .subscribe(data => this.connectionService(data,value), error => alert('There is a error in login. please try again later.'));
  }
}
