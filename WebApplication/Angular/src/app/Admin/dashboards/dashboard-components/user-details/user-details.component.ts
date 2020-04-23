import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from '../../../../admin-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  user: any[];
  constructor(private connectionService: AdminServiceService ) {}

  ngOnInit(): void {
    this.connectionService.getUserList().subscribe(
      data => {
        this.user = data;
      });

  }
}
