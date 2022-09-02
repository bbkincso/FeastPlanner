import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {MenuListItem} from "../../models/menu-list-item-model";
import {RecipeService} from "../../services/recipe.service";
import {RecipeDetails} from "../../models/recipeDetails.model";
import {RecipeListItem} from "../../models/recipe-list-item.model";
import {Ingredient} from "../../models/ingredient.model";

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {
  menu: MenuListItem;
  recipeUrls: string[];
  recipes: RecipeDetails[] = [];
  shoppingList: any[] = [];
  showBlock: string = 'start';

  constructor(private menuService: MenuService,
              public recipeService: RecipeService) {
  }

  ngOnInit(): void {

    this.menuService.onSelectedMenu.subscribe(data => {
      this.menu = data;
    })

    this.setUrls();

    this.recipeUrls.forEach((url)=> {
      this.recipeService.getRecipeDetails(url)
          .subscribe((recipeDetail) => {
            let recipe = new RecipeDetails((recipeDetail))
            this.recipes.push(recipe);
            console.log(recipe);

            recipe.extendedIngredients.forEach((ing) =>{
                this.addToArray(this.checkAisle(ing.aisle, ing));
            })
      });
    });

    console.log(this.shoppingList);

}

    private addToArray(item: any) {
        const index = this.shoppingList.findIndex(object =>
            (object.name === item.name && object.unit === item.unit)
            || (object.name === item.name && item.unit === ''));

        if (index === -1) {
            this.shoppingList.push(item);
        } else {
            this.shoppingList[index].amount += item.amount;
        }
    }


    private checkAisle(aisle: String, ingredient: Ingredient) {
      let item = {
          name: ingredient.name,
          amount: 0,
          unit: ''
      }
      if (aisle.toLowerCase().includes('spices and seasonings')) {
          item.amount = 0;
          item.unit = '';
          return item;
      } else if (aisle.includes('Oil, Vinegar, Salad Dressing')) {
          if(ingredient.measures.metric.unitLong === 'Tbsp'
              || ingredient.measures.metric.unitLong === 'Tbsps'
              || ingredient.measures.metric.unitLong === 'teaspoons'
              || ingredient.measures.metric.unitLong === 'teaspoon'
              || ingredient.measures.metric.unitLong === 'servings') {

              item.amount = 0;
              item.unit = '';
              return item;
            }
        } else {
            item.amount = ingredient.measures.metric.amount;
            item.unit = ingredient.measures.metric.unitLong;
            return item;
        }
   }

    private setUrls() {
    this.recipeUrls = this.menu.recipes.split(', ');
  }

  private checkPlural(unit: string): string {
    if (unit.endsWith('es')) {
      unit = unit.slice(0, - 2);
      return unit;
    } else if (unit.endsWith('s')) {
      unit = unit.slice(0, - 1);
      return unit;
    }
    return unit;
  }

    showShoppingList() {
        this.showBlock = 'shoppingList';
    }

    showRecipe(recipe: RecipeDetails) {
      this.recipeService.currentRecipe = new RecipeDetails(recipe);
        this.showBlock = 'recipe';
    }
}
