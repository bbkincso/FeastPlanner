import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {RecipeDetails} from "../../models/recipeDetails.model";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  sourceUrl: string;
  recipeDetails = new RecipeDetails({});
  // image: string;


  constructor(private recipeService: RecipeService) {
    // this.recipeService.onSelectedUrl.subscribe(
    //     (data) => {
    //       this.sourceUrl = data;
    //       console.log('url is: ', this.sourceUrl);
    //     }
    //);


      this.recipeService.onSelectedUrl.subscribe(
          (data) => {
              this.recipeService.getRecipeDetails(data)
                  .subscribe((recipeDetail) => {
                      this.recipeDetails = new RecipeDetails(recipeDetail);
                      //this.image = recipeDetail.image;
                  });
          })

      // this.recipeService.getRecipeDetails(this.sourceUrl)
      //     .subscribe((recipeDetail) => {
      //         this.recipeDetails = new RecipeDetails(recipeDetail);
      //         //this.image = recipeDetail.image;
      //     });

  }

  ngOnInit(): void {

  }

}
