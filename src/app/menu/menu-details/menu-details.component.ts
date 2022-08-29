import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {MenuListItem} from "../../models/menu-list-item-model";
import {RecipeService} from "../../services/recipe.service";
import {RecipeDetails} from "../../models/recipeDetails.model";
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
  //ingredients: Ingredient[] = [];

  constructor(private menuService: MenuService,
              private recipeService: RecipeService) {
    // this.menuService.onSelectedMenu.subscribe(data => {
    //   this.menuListItem = data;
    //   this.recipesUrl = this.menuListItem.recipes.split(', ');
    //
    //   for(let url of this.recipesUrl) {
    //     this.recipeService.getRecipeDetails(url)
    //         .subscribe((recipeDetail) => {
    //           let recipe = new RecipeDetails((recipeDetail));
    //           this.recipes.push(recipe);
    //
    //           for(let item of recipe.extendedIngredients) {
    //
    //             let ingredient = {
    //               name: item.name,
    //               amount: Number(item.measures.metric.amount),
    //               unit: item.measures.metric.unitLong
    //             }
    //              // console.log(this.shoppingList, 'list 1');
    //             if(this.shoppingList.length === 0) {
    //               this.shoppingList.push(ingredient);
    //             } else {
    //
    //               this.shoppingList.forEach((listItem)=>{
    //                 listItem.name === ingredient.name ?
    //                     listItem.amount += ingredient.amount :
    //                     this.shoppingList.push(ingredient);
    //               })
    //               // for(let listItem of this.shoppingList){
    //               //   //console.log(listItem, 'Listitem');
    //               //   if(listItem.name === ingredient.name) {
    //               //     listItem.amount += ingredient.amount;
    //               //   } else {
    //               //     this.shoppingList.push(ingredient);
    //               //   }
    //               // }
    //             }
    //             //console.log(ingredient);
    //           }
    //         });
    //   }
    // });
    // console.log(this.recipes, 'RECIPES');
    // console.log(this.shoppingList, 'SHOPPING LIST');
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
                 name: this.checkPlural(ing.name),
                 amount: ing.measures.metric.amount,
                 //unit: this.checkUnit(ing.measures.metric.unitLong)
                 unit: this.checkPlural(ing.measures.metric.unitLong)
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

               // console.log(ing);
               // console.log(item);
              const index = this.shoppingList.findIndex(object =>
                  (object.name === item.name && object.unit === item.unit)
                  || (object.name === item.name && item.unit === ''));
              if (index === -1) {
                //console.log('not the same');
                this.shoppingList.push(item);
              }
              else {
                this.shoppingList[index].amount += item.amount;
              }
              //this.ingredients.push(new Ingredient(ingredients));
            })
      });
    });
    //console.log(this.ingredients);
    console.log(this.shoppingList);

    // for (let i of this.ingredient) {
    //   console.log(i);
    // }


    // this.ingredients.forEach((ing) => {
    //   console.log(ing);
      // if (this.shoppingList.length != 0) {
      //   this.shoppingList.forEach((listItem) => {
      //       listItem.name != ing.name ? this.shoppingList.push(ing) : listItem.amount += ing.amount;
      //     })
      // } else {
      //   console.log('shopping list is empty');
      // }
    //})


    // console.log(this.recipes, 'RECIPES');
    // console.log(this.shoppingList, 'SHOPPING LIST');

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

  // private fillShoppingList(ingredient: Ingredient) {
  //
  //   if (this.shoppingList.length === 0) {
  //     console.log('shopping list is empty');
  //     this.shoppingList.push(ingredient);
  //   } else {
  //     console.log(this.shoppingList, 'hello');
  //     // this.shoppingList.forEach((listItem) => {
  //     //   // listItem.name == ingredient.name ?
  //     //   //     listItem.amount += ingredient.amount :
  //     //   //     this.shoppingList.push(ingredient);
  //     // })
  //   }
  // }
}
