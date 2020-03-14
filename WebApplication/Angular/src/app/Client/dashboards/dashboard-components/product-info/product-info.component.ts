import { Component } from '@angular/core';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html'
})
export class ProductInfoComponent {
  constructor() {}

  totalProduct: any = 5;
  totalProductBar: any = {
    'width': '0%'
  };

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.totalProductBar = {
      'width': this.totalProduct + '%'
    };
  }
}
