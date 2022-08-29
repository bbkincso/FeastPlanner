import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {MenuListItem} from "../../models/menu-list-item-model";
import {RecipeService} from "../../services/recipe.service";
import {RecipeDetails} from "../../models/recipeDetails.model";
import {RecipeListItem} from "../../models/recipe-list-item.model";

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
               let item = {
                 name: this.checkPlural(ing.name, 'name'),
                 amount: ing.measures.metric.amount,
                 //unit: this.checkUnit(ing.measures.metric.unitLong)
                 unit: this.checkPlural(ing.measures.metric.unitLong, 'unit')
               }

               if(ing.aisle.toLowerCase().includes('spices and seasonings')) {
                 item.name = ing.name;
                 item.amount = 0;
                 item.unit = '';
               } else if (ing.aisle === 'Oil, Vinegar, Salad Dressing' &&
                   (ing.measures.metric.unitLong === 'Tbsp' || ing.measures.metric.unitLong === 'Tbsps' || ing.measures.metric.unitLong === 'teaspoons'
                       || ing.measures.metric.unitLong === 'teaspoon' || ing.measures.metric.unitLong === 'servings')) {
                   item.amount = 0;
                   item.unit = '';
               }

              const index = this.shoppingList.findIndex(object =>
                  (object.name === item.name && object.unit === item.unit)
                  || (object.name === item.name && item.unit === ''));
              if (index === -1) {

                this.shoppingList.push(item);
              }
              else {
                this.shoppingList[index].amount += item.amount;
              }
            })
      });
    });
    console.log(this.shoppingList);

}

  private setUrls() {
    this.recipeUrls = this.menu.recipes.split(', ');
  }

  private checkPlural(unit: string, myKey: string): string {
    if (unit.endsWith('es') && myKey === 'name') {
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
      //this.recipeService.onSelectedRecipe.next(recipe);
        this.showBlock = 'recipe';
    }
}
