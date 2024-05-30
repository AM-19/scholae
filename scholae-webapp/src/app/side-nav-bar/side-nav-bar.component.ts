import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import lodash from 'lodash';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  username: string;
  public menuGroupsToBeDisplayed = [];
  emailId: string;
  sidebarcontent: any;
  content = environment["content"];
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.username = sessionStorage.getItem("userName").split("@")[0];
    // this.username="RaviBansal";
    this.handleSuccessfulResponse();
  }

  home() {
    this.router.navigate(["/dashboard"]);
  }

  userProfile() {
    this.router.navigate(["/dashboard/userprofile"]);
  }

  onLogout() {
    sessionStorage.removeItem("myToken");
    sessionStorage.removeItem("userName");
    this.router.navigate(["/"]);
  }

  handleSuccessfulResponse() {
    this.emailId = sessionStorage.getItem('userName');
    this.userService.getUserAction(this.emailId).subscribe(
      sidemenu => {
        const names = sidemenu.map(value => value.name);
        this.sidebarcontent = this.content.filter(value => {
          const commonval = lodash.intersection(value.action, names);
          if (commonval.length >= 1) {
            if (this.menuGroupsToBeDisplayed.indexOf(value) === -1) {
              this.menuGroupsToBeDisplayed.push(value);
            }
            return value;
          }

        });
      },
      error => {
        console.log('Error in userroles', error);
      });
  }
}