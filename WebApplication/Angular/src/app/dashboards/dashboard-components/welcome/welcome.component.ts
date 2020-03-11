import { Component } from '@angular/core';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  date: any;
  userName: any;

  constructor() {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    const date: Date = new Date();
    this.date = date.toDateString();
    console.log('Date = ' + this.date);

    this.userName = 'sasanka withanage';
  }
}
