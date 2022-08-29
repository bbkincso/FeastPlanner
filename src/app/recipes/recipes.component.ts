import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from "../services/recipe.service";
import {MenuService} from "../services/menu.service";
import {RecipeDetails} from "../models/recipeDetails.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  showInfo: string;
  sourceUrl: string = '';
  addedRecipes: any[] = [];

  constructor(private recipeService: RecipeService, private menuService: MenuService) { }

  ngOnInit(): void {

    this.recipeService.onDisplayChange
        .subscribe(data => {
          this.showInfo = data;
        })

    // this.menuService.onAddRecipe.subscribe(
    //     (data) => {
    //         this.sourceUrl = data.sourceUrl;
    //
    //         console.log(data);
    //         console.log(this.sourceUrl);
    //
    //         this.recipeService.getRecipeDetails(this.sourceUrl)
    //             .subscribe((recipeDetail) => {
    //                this.addedRecipes.push(recipeDetail);
    //               console.log(recipeDetail);
    //
    //                 this.menuService.onNewAddedRecipe.emit(recipeDetail);
    //             });
    //
    //     })

  }

  switchToMenuCard() {
    this.showInfo = 'menu';
  }

}
