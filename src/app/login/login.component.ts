import {Component, OnDestroy, OnInit} from '@angular/core';
import myAppConfig from "../config/my-app-config";
import {OktaAuthService} from '@okta/okta-angular';
import * as OktaSignIn from "@okta/okta-signin-widget";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy  {

  oktaSignIn: any;

  constructor(private oktaAuthService: OktaAuthService) {
    this.oktaSignIn = new OktaSignIn({
      // logo: 'assets/images/logo.png',
      features: {
        registration: true

      },
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }

    });
  }

  ngOnInit(): void {

    this.oktaSignIn.renderEl({
      el: '#okta-sign-in-widget'},
        (response: any)=> {
      if (response.status === 'SUCCESS') {
        this.oktaSignIn.signInWithRedirect();
      }
    },
        (error: any) => {
          throw error;
        }
    )
  }

  ngOnDestroy(): void {
    this.oktaSignIn.remove();
  }

}
