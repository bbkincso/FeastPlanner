import {RecipeListItem} from "./recipe-list-item.model";
import {RecipeDetails} from "./recipeDetails.model";

export class Menu{
    id: number;
    userEmail: string;
    name: string = 'New Menu';
    note: string = '';
    recipes: RecipeDetails[] = [];
}
