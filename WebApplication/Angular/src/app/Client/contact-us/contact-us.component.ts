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
  public nameEmpty;     // name field empty
  public mailEmpty;     // mail field empty
  public messageEmpty;  // message field empty

  // validate the text fields
  validator(value: any) {
    // tslint:disable-next-line:triple-equals
    if (String(value).length == 0) {
      return false;                       // return false if user did not enter data to the text field
    }
    // tslint:disable-next-line:triple-equals
    if (String(value) == 'undefined') {   // return false if the text field is undefined
      return false;
    }
    return true;                          // return true if the user entered data to the text field is defined
  }
  // validate email format
  emailValidator(value: any) {
    // tslint:disable-next-line:triple-equals
    if (this.email != /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i) {
      return false;                       // return false if email in in correct format
    }
    return true;                          // return true if the email is in correct form
  }
  submitProcess(authenticated: boolean, value: any) {
    if (authenticated) {
    } else {
    }
  }
  // on the button click in contact us form
  onSubmitForm(value: any) {
    if (!this.validator(this.name)) {             // validate the name text field
      this.nameEmpty = true;
    } else if (!this.validator(this.email)) {     // validate the name text field
      this.mailEmpty = true;
      /* } else if (!this.emailValidator(this.email)) {
         this.mailEmpty = true;*/
    } else if (!this.validator(this.message)) {   // validate the name text field
      this.messageEmpty = true;
    } else {
      // post the contacts us form details to back end to send to the database
      // tslint:disable-next-line:max-line-length
      this.connectionService.contact(value).subscribe(data => this.submitProcess(data, value), error => alert('Problem in submitting. Please check and try again..'));
      const  user = {
        uname: this.name,
        uemail: this.email,
        umessage: this.message
      };
      // post contact us form details to back end to send confirmation email to user
      this.connectionService.sendEmail(user).subscribe(
        data => {
          const res: any = data;
        },
        err => {
          console.log(err);
        }
      );
      this.back();
    }
  }
  // back to the dashboard
  back() {
    this.router.navigate(['/client/dashboard']);
  }

}

