import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  Customer: any[];
  constructor(private connectionService: AuthenticationService) { }

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
    this.connectionService.addcustomer(value).subscribe(data => {
      this.Customer = data;
    });
  }
  submit(value: any) {
    if (!this.validator(this.username)) {
      this.unameEmpty = true;
    } else if (!this.validator(this.password)) {
      this.passwordEmpty = true;
    } else {
      console.log(this.username, this.password);
      this.connectionService.addcustomerLogin(value).subscribe(
        data => console.log(data)
      );
    }
  }
  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

}
