import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor() { }

  signUpPart1 = true;
  signUpPart2 = false;
  signUpPart3 = false;
  signUpPart4 = false;
  loader = false;

  firstChange() {
    this.signUpPart1 = false;
    this.signUpPart2 = true;
    this.loader = true;
    setTimeout( () => { this.hideLoader(); } , 1900 );
  }
  hideLoader() {
    this.loader = false;
  }

  firstBack() {
    this.loader = true;
    setTimeout( () => { this.hideLoader(); } , 1900 );
  }

  secondChange() {
    this.signUpPart2 = false;
    this.signUpPart3 = true;
    this.loader = true;
    setTimeout( () => { this.hideLoader(); } , 1900 );
  }

  secondBack() {
    this.signUpPart2 = false;
    this.signUpPart1 = true;
    this.loader = true;
    setTimeout( () => { this.hideLoader(); } , 1900 );
  }

  thirdChange() {
    this.signUpPart3 = false;
    this.signUpPart4 = true;
    this.loader = true;
    setTimeout( () => { this.hideLoader(); } , 1900 );
  }

  thirdBack() {
    this.signUpPart3 = false;
    this.signUpPart2 = true;
    this.loader = true;
    setTimeout( () => { this.hideLoader(); } , 1900 );
  }

  createAccount() {
    this.signUpPart4 = false;
  }

  fourthBack() {
    this.signUpPart4 = false;
    this.signUpPart3 = true;
    this.loader = true;
    setTimeout( () => { this.hideLoader(); } , 1900 );
  }

  ngOnInit() {
  }

}
