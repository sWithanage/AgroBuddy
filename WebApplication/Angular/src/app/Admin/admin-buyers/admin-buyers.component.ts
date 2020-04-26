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
  buyer__Address: any;
  buyer_ContactNumber: any;
  part1 = true;
  part2 = false;
  part3 = false;
  constructor(private connectionService: AdminServiceService) {}

  ngOnInit() {
    this.connectionService.getBuyersList().subscribe(
      data => {
        console.log(data);
        this.buyers = data;
      });
  }

  updateBuyer(buyerId: any) {
    this.buyerId = buyerId;
    this.part1 = false;
    this.part2 = true;
    this.part3 = false;
    this.buyersDetailsToForm();
  }
  buyersDetailsToForm() {
    this.connectionService.getBuyerListById(this.buyerId).subscribe(
      data => {
        console.log(data);
        this.buyerId = data[0].buyerId;
        this.buyerName = data[0].buyerName;
        this.buyerAddress = data[0].buyerAddress;
        this.buyerContactNumber = data[0].buyerContactNumber;
      });
  }
  deletBuuyer(buyerId: any) {
    console.log(buyerId);
    this.connectionService.deleteBuyerDetails(buyerId).subscribe(
      data => console.log(buyerId)
    );
  }
  submitBuyerUpdates( value: any, buyerId: any) {
    console.log(value);
    this.connectionService.updateBuyerAll(value, buyerId).subscribe(
      data => console.log(value)
    );
  }
  addBuyerDetails(){
    this.part1 = false;
    this.part2 = false;
    this.part3 = true;
  }
  submitAddBuyerDetails(value: any) {
    this.connectionService.addBuyer(value).subscribe(
      data => console.log(data), error => alert('There is a error in login. please try again later.'
      ));
  }
}
