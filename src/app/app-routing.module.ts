import {Router, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeListComponent} from "./recipes/recipe-list/recipe-list.component";
import {MenuComponent} from "./menu/menu.component";
import {MenuListComponent} from "./menu/menu-list/menu-list.component";
import {NewMenuComponent} from "./menu/new-menu/new-menu.component";
import {OktaAuthGuard, OktaCallbackComponent} from "@okta/okta-angular";
import {LoginComponent} from "./login/login.component";
import {MenuDetailsComponent} from "./menu/menu-details/menu-details.component";

const appRoutes: Routes = [
    { path: 'login/callback', component:OktaCallbackComponent},
    { path: 'login', component:LoginComponent},
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component:RecipesComponent},
    // { path: 'recipes', component:RecipesComponent, children: [
    //         { path: '', component:RecipeListComponent},
    //         { path: 'recipe', component:RecipeDetailComponent}
    //     ]},
    { path: 'menus', component:MenuComponent, canActivate: [OktaAuthGuard], children: [
            { path: '', component:MenuListComponent},
            { path: ':id', component:MenuDetailsComponent}
        ]}

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
