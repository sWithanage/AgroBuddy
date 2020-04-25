import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../client-service.service';
import {Buyers} from '../../buyers.model';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {

  buyers: Buyers[];
  constructor(private connectionService: ClientServiceService) { }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.connectionService.getBuyers().subscribe(   // get buyers' details from a backend
      data => {
        this.buyers = data;     // assign buyers details to an array
      });
  }

}
