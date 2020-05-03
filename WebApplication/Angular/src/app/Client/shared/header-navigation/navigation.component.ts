import {Router} from '@angular/router';
import {Component, AfterViewInit, EventEmitter, Output} from '@angular/core';
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
  profileLoc: any;

  constructor(private modalService: NgbModal, private router: Router, private cookie: CookieService) {
    // tslint:disable-next-line:triple-equals
    if (this.cookie.get('user_Type') != 'user') { // user type validation
      router.navigate(['/login']);
      this.cookie.deleteAll();
    }
    this.name = this.cookie.get('user_Fname') + ' ' + this.cookie.get('user_Lname');    // get user name
    this.email = this.cookie.get('user_Email');   // get user email
  }
  ngAfterViewInit(): void {
  }

  // log out from the system
  logOut() {
    this.cookie.deleteAll();
    window.location.reload();
  }

  // view profile
  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
