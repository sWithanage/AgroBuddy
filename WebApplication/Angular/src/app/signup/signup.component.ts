import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle( 'DashBoard' );
  }

  signUpPart1 = true;
  signUpPart2 = false;
  signUpPart3 = false;
  signUpPart4 = false;

  goToPart1() {
    this.signUpPart1 = true;
    this.signUpPart2 = false;
    this.signUpPart3 = false;
    this.signUpPart4 = false;
  }
  goToPart2() {
    this.signUpPart1 = false;
    this.signUpPart2 = true;
    this.signUpPart3 = false;
    this.signUpPart4 = false;
  }
  goToPart3() {
    this.signUpPart1 = false;
    this.signUpPart2 = false;
    this.signUpPart3 = true;
    this.signUpPart4 = false;
  }
  goToPart4() {
    this.signUpPart1 = false;
    this.signUpPart2 = false;
    this.signUpPart3 = false;
    this.signUpPart4 = true;
  }
}
