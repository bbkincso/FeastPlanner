import {Component, Input, OnInit} from '@angular/core';
import {RecipeListItem} from "../../../models/recipe-list-item.model";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipeListItem: RecipeListItem;
  imageUri: string = 'https://spoonacular.com/recipeImages/';

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  selectRecipe(recipe: RecipeListItem){
    console.log(recipe, 'recipe clicked');
    this.recipeService.onSelectedUrl.emit(recipe.sourceUrl);
  }

}
