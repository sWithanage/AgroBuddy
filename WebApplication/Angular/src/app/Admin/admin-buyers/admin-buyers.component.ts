import {Component, OnInit} from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';
@Component({
  templateUrl: './admin-buyers.component.html'
})
export class AdminBuyersComponent implements OnInit {
  buyers: any[];
  buyerId: any;
  buyerName: any;
  buyerAddress: any;
  buyerContactNumber: any;
  buyers_new: any;
  buyer_Id: any;
  buyer_Name: any;
  buyer_Address: any;
  buyer_ContactNumber: any;
  part1 = true;
  part2 = false;
  part3 = false;
  constructor(private connectionService: AdminServiceService) {}
  /*---------------------------------get all buyers ----------------------------------*/
  ngOnInit() {
    this.connectionService.getBuyersList().subscribe(
      data => {
        this.buyers = data;
      });
  }

  /*------------------------view buyer update form of selected user-----------------------*/
  updateBuyer(buyerId: any) {
    this.buyerId = buyerId;
    this.part1 = false;
    this.part2 = true;
    this.part3 = false;
    this.buyersDetailsToForm();
  }

  /*---------------------------assign actual buyer details to form-----------------------*/
  buyersDetailsToForm() {
    this.connectionService.getBuyerListById(this.buyerId).subscribe(
      data => {
        this.buyerId = data[0].buyerId;
        this.buyerName = data[0].buyerName;
        this.buyerAddress = data[0].buyerAddress;
        this.buyerContactNumber = data[0].buyerContactNumber;
      });
  }

  /*----------------------------------------delete buyer----------------------------------*/
  deletBuuyer(buyerId: any) {
    this.connectionService.deleteBuyerDetails(buyerId).subscribe(
      data => window.location.reload()
    );
  }

  /*----------------get updated buyer details and send them to service class---------------*/
  submitBuyerUpdates( value: any) {
    this.connectionService.updateBuyerAll(value, this.buyerId).subscribe(
      data => window.location.reload()
    );
  }

  /*---------------------------------------view add buyer form------------------------------*/
  addBuyerDetails() {
    this.part1 = false;
    this.part2 = false;
    this.part3 = true;
  }

  /*-------------------get new buyer's details and send them to service class-----------------*/
  submitAddBuyerDetails(value: any) {
    this.connectionService.addBuyer(value).subscribe(
      data => window.location.reload(), error => alert('There is a error in login. please try again later.'));
  }
}
