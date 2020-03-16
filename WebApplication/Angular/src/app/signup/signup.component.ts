import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  Customer: any[];

  constructor(private connectionService: AuthenticationService) {

  }

  signUpPart1 = true;
  signUpPart2 = false;
  signUpPart3 = false;
  signUpPart4 = false;
  name: any;
  lname: any;
  dob: any;
  nic: any;
  email: any;
  uname: any;
  password: any;
  confirm: any;
  no: any;
  st1: any;
  st2: any;
  city: any;
  telno: any;
  phoneno: any;
  public errormassage;
  public nameEmpty;
  public lnameEmpty;
  public dobEmpty;
  public nicEmpty;
  public emailEmpty;
  public unameEmpty;
  public passwordEmpty;
  public confirmEmpty;
  public doesnotsuitEmpty;
  public NoEmpty;
  public streetEmpty;
  public cityEmpty;
  public numberEmpty;

  goToPart1() {
    this.signUpPart1 = true;
    this.signUpPart2 = false;
    this.signUpPart3 = false;
    this.signUpPart4 = false;
  }

  goToPart2() {
    console.log(this.name, this.lname, this.email, this.dob, this.nic, String(this.name).length);
    if (!this.validator(this.name)) {
        this.nameEmpty = true;
    } else if (!this.validator(this.lname)) {
        this.lnameEmpty = true;
    } else if (!this.validator(this.email) && !this.emailValidator(this.email)) {
        this.emailEmpty = true;
    } else if (!this.validator(this.dob)) {
        this.errormassage = 'Date of birth is required!';
        this.dobEmpty = true;
    } else if (!this.validator(this.nic)) {
        this.errormassage = 'NIC number is required!';
        this.nicEmpty = true;
    } else {
      this.signUpPart1 = false;
      this.signUpPart2 = true;
      this.signUpPart3 = false;
      this.signUpPart4 = false;
    }
  }

  goToPart3() {
    if (!this.validator(this.uname)) {
      this.errormassage = 'User Name is required!';
      this.unameEmpty = true;
    } else if (!this.validator(this.password) && !this.passwordValidator(this.password)) {
      this.errormassage = 'Password is required!';
      this.passwordEmpty = true;
    } else if (!this.validator(this.confirm)) {
      this.errormassage = 'Confirm your password is required!';
      this.confirmEmpty = true;
      // tslint:disable-next-line:triple-equals
    } else if (this.password != this.confirm) {
      this.errormassage = 'Invalid password..Try again!';
      this.doesnotsuitEmpty = true;
    } else {
      this.signUpPart1 = false;
      this.signUpPart2 = false;
      this.signUpPart3 = true;
      this.signUpPart4 = false;
    }
  }

  goToPart4() {
    if (!this.validator(this.no)) {
      this.errormassage = 'No is required!';
      this.NoEmpty = true;
    } else if (!this.validator(this.st1)) {
      this.errormassage = 'street1 is required!';
      this.streetEmpty = true;
    } else if (!this.validator(this.city)) {
      this.errormassage = 'City is required!';
      this.cityEmpty = true;
    } else {
      this.signUpPart1 = false;
      this.signUpPart2 = false;
      this.signUpPart3 = false;
      this.signUpPart4 = true;
    }
  }

  sendCustomerDetails(value: any) {
    this.connectionService.addcustomer(value).subscribe(data => {
      this.Customer = data;
    });
  }
  onSubmit(value: any) {
    console.log(this.phoneno, this.telno);
    // tslint:disable-next-line:triple-equals
    if (this.telno || this.phoneno == 0) {
      this.errormassage = 'You should enter telephone number or phone number!';
      this.numberEmpty = true;
    } else {
      this.connectionService.addcustomer(value).subscribe(
        data => console.log(data)
      );
    }
  }

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
    emailValidator(value: any) {
      // tslint:disable-next-line:triple-equals
      if (this.email != /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i) {
        return false;
      }
    }
    passwordValidator(value: any) {
      if (String(this.password).length < 8) {
        return false;
      }
    }
    phonenoValidator(value: any) {
      // tslint:disable-next-line:triple-equals
      if (String(this.phoneno).length != 10 && String(this.telno).length != 10) {
        return false;
      }
    }
  }
