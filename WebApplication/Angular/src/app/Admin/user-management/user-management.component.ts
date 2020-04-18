import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';
@Component({
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  user: any[];
  status_values: any = ['Admin', 'User'];
  statusDetails: any;
  constructor(private connectionService: AdminServiceService ) {}

  ngOnInit(): void {
    this.connectionService.getUserList().subscribe(
      data => {
        this.user = data;
        console.log(data);
        this.statusDetails = data[0].user_Type;
      });
  }

  update(userIdToChange: any, userTypeToChange: any) {
    console.log(userIdToChange + ' ' + userTypeToChange);
    this.connectionService.updateUserType(userIdToChange, userTypeToChange).subscribe(
      data => console.log(userIdToChange + ' ' + userTypeToChange)
    );
  }
}
