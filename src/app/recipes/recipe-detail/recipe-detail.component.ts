import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {RecipeDetails} from "../../models/recipeDetails.model";
import {ActivatedRoute, Params} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  sourceUrl: any;
  recipeDetails = new RecipeDetails();
  // @Input() recipe = new RecipeDetails({});


  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {

    // this.recipeService.onSelectedUrl.subscribe(
    //     (data) => {
    //       this.sourceUrl = data;
    //       console.log('url is: ', data);
    //     }
    // );


      // this.recipeService.onSelectedUrl.subscribe(
      //     (data) => {
      //         this.recipeService.getRecipeDetails(data)
      //             .subscribe((recipeDetail) => {
      //                 this.recipeDetails = new RecipeDetails(recipeDetail);
      //             });
      //     });

      // this.recipeService.getRecipeDetails('http://www.thegraciouspantry.com/clean-eating-cilantro-salsa/')
      //     .subscribe((recipeDetail) => {
      //         this.recipeDetails = new RecipeDetails(recipeDetail);
      //         //this.image = recipeDetail.image;
      //     });
}


   ngOnInit(): void {
    this.route
        .queryParams.subscribe( params => {
            // this.sourceUrl = params['url'];
            // console.log(this.sourceUrl);
        this.recipeService.getRecipeDetails(params['url'])
            .subscribe((recipeDetail) => {
                this.recipeDetails = recipeDetail;
                //this.image = recipeDetail.image;
            });
        })
  }

    addToRecipe(recipe: RecipeDetails){
        this.recipeService.onAddedRecipe.emit(recipe);
        console.log('add to recipe clicked. recipe = ', recipe);
    }
}
