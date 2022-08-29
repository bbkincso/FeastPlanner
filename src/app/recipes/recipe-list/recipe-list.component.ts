import {Component, Input, OnInit} from '@angular/core';
import {RecipeListItem} from "../../models/recipe-list-item.model";
import {RecipeService} from "../../services/recipe.service";
import {RecipeQueryParamModel} from "../../models/recipe-query-param.model";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeList: RecipeListItem[];
  recipeQueryParams : RecipeQueryParamModel = new RecipeQueryParamModel();

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    //this.recipeList = this.recipeService.getRecipes();

    this.recipeService.onAddedFilters.subscribe(
        (data) => {
              console.log(data);
              // this.intolerances = data.intoleranceArray;
              // this.cuisine = data.cuisineArray;
              this.recipeQueryParams.query = data.includeIngredient;
              this.recipeQueryParams.excludeIngredients = data.excludeIngredients;
              this.recipeQueryParams.intolerances = data.intoleranceArray.toString();
              this.recipeQueryParams.diet = data.diet;
              this.recipeQueryParams.cuisine = data.cuisineArray.toString();
              this.recipeQueryParams.type = data.course;
              console.log(this.recipeQueryParams.cuisine);

            this.recipeService.getRecipeList(
                this.createUrl(this.recipeQueryParams.number,
                    this.recipeQueryParams.offset,
                    this.recipeQueryParams.query,
                    this.recipeQueryParams.excludeIngredients,
                    this.recipeQueryParams.intolerances,
                    this.recipeQueryParams.diet,
                    this.recipeQueryParams.cuisine,
                    this.recipeQueryParams.type
                    ))
                .subscribe((response) => {
                    this.recipeList = response;
                    console.log(response, 'RECIPE LIST with filters');
                });

                  });

      this.recipeService.getRecipeList(
          this.createUrl(this.recipeQueryParams.number, this.recipeQueryParams.offset))
          .subscribe((response) => {
              this.recipeList = response;
              console.log(response, 'RECIPE LIST');
          });

  }

  createUrl(number: string,
            offset: string,
            query?: string,
            exclude?: string,
            intolerances?: string,
            diet?:string,
            cuisine?: string,
            type?:string) {
    let myUrl: string = 'http://localhost:8085/all-recipes?'
        + (query  ? 'query=' + query : '')
        + (exclude ? '&excludeIngredients=' + exclude : '')
        + (intolerances ? '&intolerances=' + intolerances : '')
        + (diet ? '&diet=' + diet : '')
        + (cuisine ? '&cuisine=' + cuisine : '')
        + (type ? '&type=' + type : '')
        + (number ? '&number=' + number : '')
        + (offset ? '&offset=' + offset : '')

      return myUrl;
  }

  showRecipes() {
    // this.recipeService.getRecipeList()
    //     .subscribe((response) => {
    //       this.recipeList = response;
    //       // console.log(response, 'RECIPE LIST');
    //     });
  }


}
