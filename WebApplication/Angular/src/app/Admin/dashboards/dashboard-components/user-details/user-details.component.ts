import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from '../../../../admin-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  user: any[];
  user_Id: any;
  constructor(private route: ActivatedRoute, private connectionService: AdminServiceService ) {}

  ngOnInit(): void {
    this.connectionService.getUserList().subscribe(
      data => {
        this.user = data;
      });
    this.route.queryParams.subscribe(params => {
      this.user_Id = params[this.user_Id];
    });
  }
}
