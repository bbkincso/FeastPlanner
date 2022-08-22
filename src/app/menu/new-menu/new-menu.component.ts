import {Component, OnChanges, OnInit} from '@angular/core';
import {Menu} from "../../models/menu.model";
import {MenuService} from "../../services/menu.service";
import {RecipeListItem} from "../../models/recipe-list-item.model";
import {RecipeDetails} from "../../models/recipeDetails.model";
import {RecipeService} from "../../services/recipe.service";
import {MenuListItem} from "../../models/menu-list-item-model";
// import {Observable} from "rxjs";

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.css']
})
export class NewMenuComponent implements OnInit{
  newMenu = new Menu();
  sourceUrl: string = '';
  recipes: string ='';
  menu = new MenuListItem('', '', '', '');
  user: string;

  constructor(private menuService: MenuService, private recipeService: RecipeService) {
    // this.menuService.onNewAddedRecipe.subscribe(
    //     (data) => {
    //       this.newMenu.recipes = data;
    //       console.log('WHAT')
    //     }
    // )

    // this.menuService.onAddRecipe.subscribe(
    //     (data) => {
    //       this.sourceUrl = data.sourceUrl;
    //
    //       console.log('menu data');
    //       console.log(data);
    //       console.log(this.sourceUrl);
    //
    //       this.recipeService.getRecipeDetails(this.sourceUrl)
    //           .subscribe((recipeDetail) => {
    //             //this.recipe = recipeDetail;
    //             this.newMenu.recipes.push(recipeDetail);
    //             //this.image = recipeDetail.image;
    //           });
    //
    //     })
  }

  ngOnInit(): void {
    this.menuService.onAddedRecipe.subscribe(
        (data) => {
          //this.sourceUrl = data.sourceUrl;

          console.log('menu data');
          console.log(data);
          //console.log(this.sourceUrl);
            this.recipes = this.recipes + ', ' + data.sourceUrl;
            console.log(this.recipes);

                this.recipeService.getRecipeDetails(data.sourceUrl)
              .subscribe((recipeDetail) => {
                //this.recipe = recipeDetail;
                this.newMenu.recipes.push(recipeDetail);
                //this.image = recipeDetail.image;
              });
        })

      this.menuService.userSubject.subscribe(data => {
          this.user = data;
      })

  }


    saveMenuCard() {
        this.menu.userEmail = this.user;
        this.menu.name = this.newMenu.name;
        this.menu.note = this.newMenu.note;
        this.menu.recipes = this.recipes;

        console.log(this.menu);
        this.menuService.saveMenu(this.menu);
    }
}
