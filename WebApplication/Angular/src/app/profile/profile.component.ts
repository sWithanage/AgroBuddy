import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminServiceService} from '../admin-service.service';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  user_Id: number;
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
  constructor(private connectionService: AdminServiceService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.queryParams
      .filter(params => params.user_Id)
      .subscribe(params => {
        this.user_Id = params.user_Id;
        console.log(this.user_Id);
      });

    // tslint:disable-next-line:no-unused-expression
    this.connectionService.getAllUserById(this.user_Id).subscribe(
      data => {
        console.log(data);
        this.user_Lname = data[0].user_Lname;
        this.user_Fname = data[0].user_Fname;
        this.user_Email = data[0].user_Email;
        this.user_TelNo = data[0].user_TelNo;
        this.user_Id = data[0].user_Id;
        this.user_AddressNo = data[0].user_AddressNo;
        this.user_Street1 = data[0].user_Street1;
        this.user_Street2 = data[0].user_Street2;
        this.user_City = data[0].user_City;
        this.user_Type = data[0].user_Type;
        this.user_PhoneNo = data[0].user_PhoneNo;
        this.user_Dob = data[0].user_Dob;
        this.user_NIC = data[0].user_NIC;
      });


    }
}
