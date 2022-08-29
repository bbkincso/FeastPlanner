import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './recipes/recipe-list/recipe-list-item/recipe-list-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { MenuComponent } from './menu/menu.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { NewMenuComponent } from './menu/new-menu/new-menu.component';
import { FiltersComponent } from './filters/filters.component';
import { LoginComponent } from './login/login.component';
import { LoginStatusComponent } from './login-status/login-status.component';
import {OKTA_CONFIG, OktaAuthModule} from "@okta/okta-angular";
import {Router} from "@angular/router";
import myAppConfig from "./config/my-app-config";
import { MenuListItemComponent } from './menu/menu-list/menu-list-item/menu-list-item.component';
import { MenuDetailsComponent } from './menu/menu-details/menu-details.component';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth: any, injector: Injector) => {
    const router = injector.get(Router);
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeListItemComponent,
    RecipeDetailComponent,
    HeaderComponent,
    RecipesComponent,
    MenuComponent,
    MenuListComponent,
    NewMenuComponent,
    FiltersComponent,
    LoginComponent,
    LoginStatusComponent,
    MenuListItemComponent,
    MenuDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [
      { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
