import {Component, Input, OnInit} from '@angular/core';
import {RecipeListItem} from "../../../models/recipe-list-item.model";
import {RecipeService} from "../../../services/recipe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipeListItem: RecipeListItem;
  imageUri: string = 'https://spoonacular.com/recipeImages/cabbage-salad-with-peanuts-723984.jpg';
  // imageUri: string;
  // url: string = this.sourceUrl.substr(11);

  constructor(private recipeService: RecipeService, private router: Router) {
    // this.recipeService.getBaseUri().subscribe( (resp) => {
    //   this.imageUri = resp + this.recipeListItem.image;
    // });
    // this.recipeService.getBaseUri();
  }

  ngOnInit(): void {

  }

  selectRecipe(recipe: RecipeListItem){
    console.log(recipe, 'recipe clicked');
    this.router.navigate(['recipes/recipe'], {queryParams: {url: recipe.sourceUrl}});
    //this.recipeService.onSelectedUrl.emit(recipe.sourceUrl);
  }

}
