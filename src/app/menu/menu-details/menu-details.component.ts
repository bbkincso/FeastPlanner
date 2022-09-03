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
  totalPrice: number = 0.00;
  priceNotFound: string = 'Price not found for the following items:';
  count: number = 0;
  error: string = '';

  constructor(public menuService: MenuService,
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

                this.menuService.getPriceOfItem(ing.name)
                    .subscribe((response) => {
                        //console.log(response);
                        this.checkPrice(response);
                        //this.totalPrice += response.price;
                    }, (error => {
                        // this.error = error.error.error;
                        this.priceNotFound = this.priceNotFound + ' - ' + ing.name;
                        this.count += 1;
                        console.log('404 STATUS');
                        }
                        )
                    )
            })
      });
    });
}

    private checkPrice(response: any) {
      let newTotal: number = this.totalPrice + response.price;
      this.totalPrice = Number((this.totalPrice + response.price).toFixed(2));

      console.log('200 STATUS');
    }

    private addToArray(item: any) {
        const index_1 = this.shoppingList.findIndex(object =>
            (this.checkPlural(object.name, item.name) && this.checkPlural(object.unit, item.unit))
            || (this.checkPlural(object.name, item.name) && item.unit === ''));

        // const index_2 = this.shoppingList.findIndex(object =>
        //     (this.checkPlural(object.name, item.name) && !this.checkPlural(object.unit, item.unit)));

        if (index_1 === -1 ) {
            if (item.unit === '') {
                this.shoppingList.push(item);
            } else {
                this.shoppingList.unshift(item);
            }
        }
        else {
            // if(index_2 === -1) {
            //     this.shoppingList[index_1].amount += item.amount;
            //     console.log('added up');
            // } else {
            //     this.shoppingList.splice(index_2 + 1, 0, item);
            //     console.log('the same', item.name);
            // }
            this.shoppingList[index_1].amount += item.amount;
            console.log('added up');
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

  private checkPlural(string_1: string, string_2: string): boolean {
      let isTrue: boolean = false;

      if (string_1 === string_2) {
          isTrue = true;
          return isTrue;
      }
      if (string_1.slice(0, -2) === string_2 || string_1 === string_2.slice(0,-2)) {
          isTrue = true;
          return isTrue;
      } else if (string_1.slice(0, -1) === string_2 || string_1 === string_2.slice(0,-1)) {
          isTrue = true;
          return isTrue;
      } else {
          return isTrue;
      }
  }

    showShoppingList() {
        this.showBlock = 'shoppingList';
    }

    showRecipe(recipe: RecipeDetails) {
      this.recipeService.currentRecipe = new RecipeDetails(recipe);
        this.showBlock = 'recipe';
    }
}
