import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientServiceService} from '../../client-service.service';

@Component({
  selector: 'app-plant-finder',
  templateUrl: './plant-finder.component.html',
  styleUrls: ['./plant-finder.component.css']
})
export class PlantFinderComponent  {

  constructor(private router: Router, private connectionService: ClientServiceService) { }

  location: any;
  date: any;
  plant: any;
  area: any;
  public locationEmpty;
  public dateEmpty;
  plantDetails = false;
  fullPage =  true;
  confirmation =  false;
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
  submitProcess(authenticated: boolean, value: any) {
    if (authenticated) {
      console.log('Successfully submitted...!');
    } else {
      console.log('Try again');
    }
  }
  onSubmitForm(value: any) {
    if (!this.validator(this.location)) {
      this.locationEmpty = true;
    } else if (!this.validator(this.date)) {
      this.dateEmpty = true;
    } else {
      // tslint:disable-next-line:max-line-length
      this.connectionService.contact(value).subscribe(data => this.submitProcess(data, value), error => alert('Problem in submitting. Please check and try again..'));
      this.details();
    }
  }
  details() {
    this.plantDetails = true;
  }
  confirm() {
    this.fullPage = false;
    this.confirmation = true;
  }
  cancel() {
    this.router.navigate(['/client/dashboard']);
  }
  back() {
    this.confirmation = false;
    this.fullPage = true;
  }
  onClick() {}
}
