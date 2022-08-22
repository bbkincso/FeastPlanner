import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {MenuService} from "../services/menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = "";

  constructor(private oktaAuthService: OktaAuthService, private menuService: MenuService) {
      // this.oktaAuthService.$authenticationState.subscribe(
      //     isAuth => this.isAuthenticated = isAuth
      // );
      //
      // this.oktaAuthService.isAuthenticated().then(
      //     (isAuthenticated) => {
      //         this.isAuthenticated = isAuthenticated;
      //         console.log(isAuthenticated, 'auth');
      //         if (this.isAuthenticated) {
      //             this.oktaAuthService.getUser().then(
      //                 (user) => {
      //                     this.userFullName = user.name || "";
      //                     console.log(user.name);
      //                 }
      //             );
      //         }
      //     }
      // );
  }

  async ngOnInit() {

      // this.isAuthenticated = await this.oktaAuthService.isAuthenticated()

      // if (this.isAuthenticated) {
      //     const userClaims = await this.oktaAuthService.getUser();
      //     this.userFullName = userClaims.name || "";
      //     console.log(userClaims.name);
      // }



    this.oktaAuthService.$authenticationState.subscribe(
        (result) => {
          this.isAuthenticated = result;
          this.getUserDetails();
        }
    )
   }

  private getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuthService.getUser().then(
          (res) => {
            this.userFullName = res.name;
            this.menuService.userSubject.next(res.email);
          }
      );
    }
   }

  private logOut() {
    this.oktaAuthService.signOut();
  }
}
