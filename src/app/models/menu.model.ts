import {RecipeListItem} from "./recipe-list-item.model";
import {RecipeDetails} from "./recipeDetails.model";

export class Menu{
    id: number;
    userEmail: string;
    name: string = '';
    note: string = '';
    recipes: RecipeDetails[] = [];
}
