import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-admin-welcome',
  templateUrl: './admin-welcome.component.html'
})
export class AdminWelcomeComponent {
  date: any;
  userName: any;

  constructor(private cookie: CookieService) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    const date: Date = new Date();
    this.date = date.toDateString();
    this.userName = this.cookie.get('user_Fname') + ' ' + this.cookie.get('user_Lname');
  }
}
