import {Router} from '@angular/router';
import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {CookieService} from 'ngx-cookie-service';
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
  name: any;
  email: any;

  constructor(private modalService: NgbModal, private router: Router, private cookie: CookieService) {
    // tslint:disable-next-line:triple-equals
    if (this.cookie.get('user_Type') != 'user') {
      router.navigate(['/login']);
      this.cookie.deleteAll();
    }
    this.name = this.cookie.get('user_Fname') + ' ' + this.cookie.get('user_Lname');
    this.email = this.cookie.get('user_Email');
  }
  ngAfterViewInit() {}

  logOut() {
    this.cookie.deleteAll();
    window.location.reload();
  }
}
