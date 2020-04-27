import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminServiceService} from '../admin-service.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  user_Id: string;
  user_Type: string;
  user_Fname: string;
  user_Lname: string;
  user_Email: string;
  user_NIC: string;
  user_Dob: string;
  user_AddressNo: number;
  user_Street1: string;
  user_Street2: string;
  user_City: string;
  user_PhoneNo: string;
  user_Username: string;
  user_Password: string;
  user_TelNo: string;
  adminDashboard = false;
  clientDashboard = false;
  constructor(private connectionService: AdminServiceService, private route: ActivatedRoute, private cookie: CookieService) {
  }
  ngOnInit(): void {
    this.user_Id = this.cookie.get('user_Id');
    // tslint:disable-next-line:no-unused-expression
    this.connectionService.getAllUserById(this.user_Id).subscribe(
      data => {
        this.user_Lname = data[0].user_Lname;
        this.user_Fname = data[0].user_Fname;
        this.user_Email = data[0].user_Email;
        this.user_TelNo = data[0].user_TelNo;
        this.user_Id = String(data[0].user_Id);
        this.user_AddressNo = data[0].user_AddressNo;
        this.user_Street1 = data[0].user_Street1;
        this.user_Street2 = data[0].user_Street2;
        this.user_City = data[0].user_City;
        this.user_Type = data[0].user_Type;
        this.user_PhoneNo = data[0].user_PhoneNo;
        this.user_Dob = data[0].user_Dob;
        this.user_NIC = data[0].user_NIC;

        // tslint:disable-next-line:triple-equals
        if (this.user_Type == 'admin') {
          this.adminDashboard = true;
        }
        // tslint:disable-next-line:triple-equals
        if (this.user_Type == 'user') {
          this.clientDashboard = true;
        }
      });
    }
}
