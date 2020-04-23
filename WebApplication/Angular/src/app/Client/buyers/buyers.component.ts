import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../client-service.service';
import {ActivatedRoute} from '@angular/router';
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
    this.connectionService.getBuyers().subscribe(
      data => {
        this.buyers = data;
      });
  }

}
