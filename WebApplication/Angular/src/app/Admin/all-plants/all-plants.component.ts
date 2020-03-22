import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
@Component({
  templateUrl: 'all-plants.component.html'
})
export class AllPlantsComponent {
  order: string;
  constructor(private route: ActivatedRoute) { }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.route.queryParams
      .filter(params => params.order1)
      .subscribe(params => {
        console.log(params);

        this.order = params.order;
        console.log(this.order);
      });
    this.route.queryParams
      .filter(params => params.order2)
      .subscribe(params => {
        console.log(params);

        this.order = params.order;
        console.log(this.order);
      });
    this.route.queryParams
      .filter(params => params.order3)
      .subscribe(params => {
        console.log(params);

        this.order = params.order;
        console.log(this.order);
      });
    this.route.queryParams
      .filter(params => params.order4)
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.order = params.order;
        console.log(this.order); // popular
      });
  }
}
