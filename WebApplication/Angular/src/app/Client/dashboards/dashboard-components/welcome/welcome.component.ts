import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
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
