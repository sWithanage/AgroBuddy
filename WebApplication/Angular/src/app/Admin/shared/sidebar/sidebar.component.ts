import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar.component.html'
})
// tslint:disable-next-line:component-class-suffix
export class SidebarComponentAdmin implements OnInit {
  showMenu = '';
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) {}

  // End open close
  // tslint:disable-next-line:member-ordering
  name: any;
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.name = this.cookie.get('user_Fname') + ' ' + this.cookie.get('user_Lname');
  }

  logOut() {
    this.cookie.deleteAll();
    window.location.reload();
  }
}
