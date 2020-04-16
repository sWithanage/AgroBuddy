import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientServiceService} from '../../client-service.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  plantDetails: any[];
  constructor(private route: ActivatedRoute, private connectionService: ClientServiceService) { }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.connectionService.getPlants().subscribe(
      data => {
        this.plantDetails = data;
      });
  }

}
