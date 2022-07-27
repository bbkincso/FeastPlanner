import {EventEmitter, Injectable} from "@angular/core";
import {RecipeListItem} from "../models/recipe-list-item.model";

@Injectable({providedIn: 'root'})
export class RecipeService {

    onSelectedUrl = new EventEmitter<string>();

    private recipeList: RecipeListItem[] = [
        new RecipeListItem('Cabbage Salad with Peanuts', 'cabbage-salad-with-peanuts-723984.jpg',
            'http://naturallyella.com/cabbage-salad-with-peanuts/',10),
        new RecipeListItem('Stuffed Sweet Potato with Spinach, Hummus & Feta', 'Stuffed-Sweet-Potato-with-Spinach--Hummus---Feta-584549.jpg',
            'http://www.cookincanuck.com/2013/09/stuffed-sweet-potato-recipe-with-spinach-hummus-feta/', 10),
        new RecipeListItem('Cilantro Salsa', 'Cilantro-Salsa-667917.jpg',
            'http://www.thegraciouspantry.com/clean-eating-cilantro-salsa/', 20),
    ];

    getRecipes() {
        return this.recipeList.slice();
    }
}
