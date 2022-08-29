import {Component, Input, OnInit} from '@angular/core';
import {RecipeListItem} from "../../../models/recipe-list-item.model";
import {RecipeService} from "../../../services/recipe.service";
import {Router} from "@angular/router";
import {MenuService} from "../../../services/menu.service";
import {RecipeDetails} from "../../../models/recipeDetails.model";

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipeListItem: RecipeListItem;
   imageUri: string;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private menuService: MenuService) {
    this.recipeService.getBaseUri().subscribe( (resp) => {
      this.imageUri = resp + this.recipeListItem.image;
    });
     //this.recipeService.getBaseUri();
  }

  ngOnInit(): void {

  }

  selectRecipe(recipe: RecipeListItem){
    this.recipeService.getRecipeDetails(recipe.sourceUrl)
        .subscribe((recipeDetail) => {
          this.recipeService.currentRecipe = new RecipeDetails(recipeDetail);
        });
    this.recipeService.onDisplayChange.next('recipe');
  }

  addRecipeToMenuCard(recipe:RecipeListItem){
    this.recipeService.recipeUrls = this.recipeService.recipeUrls + ', ' + recipe.sourceUrl;

    this.recipeService.getRecipeDetails(recipe.sourceUrl)
        .subscribe((recipeDetail) => {
          this.menuService.menuRecipes.push(recipeDetail);
        });
  }
}
