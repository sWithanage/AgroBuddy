import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';
@Component({
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  part1 = true;
  part2 = false;
  userIdToUpdate: any;
  user: any[];
  client: any[];
  status_values: any = ['Admin', 'User'];
  statusDetails: any;
  userId: number;
  userType: string;
  userFname: string;
  userLname: string;
  userUsername: string;
  userEmail: string;
  userNIC: string;
  userDob: string;
  userAddressNo: number;
  userStreet1: string;
  userStreet2: string;
  userCity: string;
  userPhoneNo: string;
  user_Password: string;
  userTelNo: string;
  constructor(private connectionService: AdminServiceService ) {}

  ngOnInit(): void {
    this.connectionService.getUserList().subscribe(
      data => {
        this.user = data;
        this.statusDetails = data[0].user_Type;
      });
  }
  deleteRow(userId: any) {
      this.connectionService.deleteUserDetails(userId).subscribe(
        data => window.location.reload()
      );
  }

  update(userIdToChange: any, userTypeToChange: any) {
    this.connectionService.updateUserType(userIdToChange, userTypeToChange).subscribe(
      data => window.location.reload()
    );
  }


  gotoPart2() {
    this.part1 = false;
    this.part2 = true;
  }

  updateUser(user_Id: any) {
    this.userIdToUpdate = user_Id;
    this.part1 = false;
    this.part2 = true;
    this.updateClientDetailsToForm();
  }

  updateClientDetailsToForm() {
    this.connectionService.getUserListById(this.userIdToUpdate).subscribe(
      data => {
        this.client = data;
        this.userId = data[0].user_Id;
        this.userFname = data[0].user_Fname;
        this.userLname = data[0].user_Lname;
        this.userEmail = data[0].user_Email;
        this.userNIC = data[0].user_NIC;
        this.userDob = data[0].user_Dob;
        const newDate = new Date(this.userDob);
        this.userAddressNo = data[0].user_AddressNo;
        this.userStreet1 = data[0].user_Street1;
        this.userStreet2 = data[0].user_Street2;
        this.userUsername = data[0].user_Username;
        this.userType = data[0].user_Type;
        this.userCity = data[0].user_City;
        this.userPhoneNo = data[0].user_PhoneNo;
        this.userTelNo = data[0].user_TelNo;

      });

  }

  submitUpdates( values: any, user_Id: number) {
    this.connectionService.updateUserAll(values, user_Id).subscribe(
      data => window.location.reload()
    );
  }
}
