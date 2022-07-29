import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeListComponent} from "./recipes/recipe-list/recipe-list.component";
import {MenuComponent} from "./menu/menu.component";
import {MenuListComponent} from "./menu/menu-list/menu-list.component";
import {NewMenuComponent} from "./menu/new-menu/new-menu.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component:RecipesComponent, children: [
            { path: '', component:RecipeListComponent},
            { path: 'recipe', component:RecipeDetailComponent}
        ]},
    { path: 'menu', component:MenuComponent, children: [
            { path: '', component:MenuListComponent},
            { path: 'new', component:NewMenuComponent},
        ]}

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
