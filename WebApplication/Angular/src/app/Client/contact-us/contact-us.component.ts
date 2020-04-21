import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../client-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  constructor(private router: Router, private connectionService: ClientServiceService) { }

  name: any;
  email: any;
  message: any;
  public nameEmpty;
  public mailEmpty;
  public messageEmpty;

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
    return true;
  }
  submitProcess(authenticated: boolean, value: any) {
    if (authenticated) {
      console.log('Successfully submitted...!');
    } else {
      console.log('Try again');
    }
  }
  onSubmitForm(value: any) {
    if (!this.validator(this.name)) {
      this.nameEmpty = true;
    } else if (!this.validator(this.email)) {
      this.mailEmpty = true;
   /* } else if (!this.emailValidator(this.email)) {
      this.mailEmpty = true;*/
    } else if (!this.validator(this.message)) {
      this.messageEmpty = true;
    } else {
      // tslint:disable-next-line:max-line-length
      this.connectionService.contact(value).subscribe(data => this.submitProcess(data, value), error => alert('Problem in submitting. Please check and try again..'));
      this.back();
    }
  }
  back() {
    this.router.navigate(['/client/dashboard']);
  }

}

