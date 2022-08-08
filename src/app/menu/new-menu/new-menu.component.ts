import { Component, OnInit } from '@angular/core';
import {Menu} from "../../models/menu.model";
import {MenuService} from "../../services/menu.service";
import {RecipeListItem} from "../../models/recipe-list-item.model";
import {RecipeDetails} from "../../models/recipeDetails.model";
import {RecipeService} from "../../services/recipe.service";
// import {Observable} from "rxjs";

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.css']
})
export class NewMenuComponent implements OnInit {
  newMenu: Menu = new Menu();
  sourceUrl: string = '';
  recipe: RecipeDetails = new RecipeDetails();

  constructor(private menuService: MenuService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.menuService.onAddRecipe.subscribe(
        (data) => {
            this.sourceUrl = data.sourceUrl;

            console.log('menu data');
            console.log(data);
            console.log(this.sourceUrl);

            this.recipeService.getRecipeDetails(this.sourceUrl)
                .subscribe((recipeDetail) => {
                    //this.recipe = recipeDetail;
                    this.newMenu.recipes.push(recipeDetail);
                    //this.image = recipeDetail.image;
                });

        })
  }

}
