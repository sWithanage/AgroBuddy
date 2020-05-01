import { Component } from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';
import {Router} from '@angular/router';
@Component({
  templateUrl: 'user-update.component.html'
})
export class UserUpdateComponent {
  subject: any;
  message: any;
  subjectEmpty: any;
  messageEmpty: any;
  constructor(private connectionService: AdminServiceService, private router: Router) {
  }
  /*----------------return false if text field is empty------------------*/
  validator(value: any) {
    // tslint:disable-next-line:triple-equals
    if (String(value).length == 0) {
      return false;
    }
    /*----------------return false if the text field is undefined------------------*/
    // tslint:disable-next-line:triple-equals
    if (String(value) == 'undefined') {
      return false;
    }
    return true;                          // return true if the user entered data to the text field is defined
  }
  submitProcess(authenticated: boolean, value: any) {
    if (authenticated) {
    } else {
    }
  }
  /*--------validate text area of subject and message----------------------*/
  onSubmitForm(value: any) {
    if (!this.validator(this.subject)) {
      this.subject = true;
    } else if (!this.validator(this.message)) {
      this.message = true;
    } else if (!this.validator(this.message)) {
      this.messageEmpty = true;
    } else {
      this.connectionService.contact(value).subscribe(data => this.submitProcess(data, value), error => alert('Problem in submitting. Please check and try again..'));
      const  user = {
        subject: this.subject,
        message: this.message,
    };
      /*------get form values and send it to service class to send mails to all users---------*/
      this.connectionService.sendEmail(user).subscribe(
        data => {
          const res: any = data;
          this.back();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  /*------go back to admin dashboard after sent emails to every one---------*/
  back() {
    this.router.navigate(['/admin/dashboard']);
  }
}
