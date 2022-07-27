import { Component, OnInit } from '@angular/core';
import {RecipeListItem} from "../../models/recipe-list-item.model";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeList: RecipeListItem[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    //this.recipeList = this.recipeService.getRecipes();

  }

  showRecipes() {
    this.recipeService.getRecipeList()
        .subscribe((response) => {
          this.recipeList = response;
          // console.log(response, 'RECIPE LIST');
        });
  }


}
