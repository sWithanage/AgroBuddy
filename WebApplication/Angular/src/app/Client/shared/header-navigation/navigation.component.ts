import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
declare var $: any;

@Component({
  selector: 'app-navigation-client',
  templateUrl: './navigation.component.html'
})
// tslint:disable-next-line:component-class-suffix
export class NavigationComponentClient implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  constructor(private modalService: NgbModal) {}
  ngAfterViewInit() {}
}
