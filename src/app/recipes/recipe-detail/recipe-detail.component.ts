import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {RecipeDetails} from "../../models/recipeDetails.model";
import {ActivatedRoute, Params} from "@angular/router";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
  sourceUrl: any;
  //recipeDetails: any;
  //recipeDetails = new RecipeDetails({});
  // @Input() recipe = new RecipeDetails({});
    //subscription1$: Subscription;
    //subscription2$: Subscription;
    showblock: string = 'ingredients';


  constructor(public recipeService: RecipeService,
              private route: ActivatedRoute) {

    // this.recipeService.onSelectedUrl.subscribe(
    //     (data) => {
    //       this.sourceUrl = data;
    //       console.log('url is: ', data);
    //     }
    // );





      // this.recipeService.getRecipeDetails('http://www.thegraciouspantry.com/clean-eating-cilantro-salsa/')
      //     .subscribe((data) => {
      //         this.recipeDetails = new RecipeDetails(data);
      //         //this.image = recipeDetail.image;
      //     });
}


   ngOnInit(): void {
    // this.route
    //     .queryParams.subscribe( params => {
    //         // this.sourceUrl = params['url'];
    //         // console.log(this.sourceUrl);
    //     this.recipeService.getRecipeDetails(params['url'])
    //         .subscribe((recipeDetail) => {
    //             this.recipeDetails = recipeDetail;
    //             //this.image = recipeDetail.image;
    //         });
    //     })

       // this.subscription1$ = this.recipeService.onSelectedUrl.subscribe(
       //     (data) => {
       //         this.recipeService.getRecipeDetails(data)
       //             .subscribe((recipeDetail) => {
       //                 //this.recipeDetails = new RecipeDetails(recipeDetail);
       //                 this.recipeService.currentRecipe = new RecipeDetails(recipeDetail);
       //             });
       //     });

       // this.subscription2$ = this.recipeService.onSelectedRecipe.subscribe(
       //     (data) => {
       //         this.recipeService.currentRecipe = new RecipeDetails(data);
       //     });
  }

    ngOnDestroy(): void {
      //this.subscription1$.unsubscribe();
      //this.subscription2$.unsubscribe();
    }

  changeShowBlock(block: string) {
    this.showblock = block;
  }
}
