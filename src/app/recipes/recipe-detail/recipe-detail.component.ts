import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  url: string;

  constructor(private recipeService: RecipeService) {
    this.recipeService.onSelectedUrl.subscribe(
        (data) => {
          this.url = data;
          console.log('url is: ', this.url);
        }
    )
  }

  ngOnInit(): void {
  }

}
