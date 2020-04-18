import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AdminServiceService} from '../../admin-service.service';
@Component({
  templateUrl: 'changeModel.component.html'
})
export class ChangeModelComponent {
  modelDetails: any[];
  variables: string;
  constructor(private route: ActivatedRoute, private connectionService: AdminServiceService) {
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.variables = params['variables'];
      });
  }
}
