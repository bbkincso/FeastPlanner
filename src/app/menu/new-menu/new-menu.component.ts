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
  //menu = new MenuListItem('', '', '', '');
  user: string;

  constructor(private menuService: MenuService, private recipeService: RecipeService) {
  }

  ngOnInit(): void {
      this.newMenu.recipes = this.menuService.menuRecipes;
      this.menuService.userSubject.subscribe(data => {
          this.user = data;
      })

  }


    saveMenuCard() {
        this.menuService.saveMenu(new MenuListItem(this.user, this.newMenu.name, this.newMenu.note, this.recipeService.recipeUrls));
    }
}
