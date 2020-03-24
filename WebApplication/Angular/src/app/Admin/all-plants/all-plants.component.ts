import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import {AdminServiceService} from '../../admin-service.service';
@Component({
  templateUrl: 'all-plants.component.html'
})
export class AllPlantsComponent {

  plantDetails: any[];
  constructor(private route: ActivatedRoute, private connectionService: AdminServiceService) { }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.connectionService.getAllPlants().subscribe(
      data => {
        this.plantDetails = data;
      });
  }

}
