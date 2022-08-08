import {Ingredient} from "./ingredient.model";

export class RecipeDetails {
    public vegetarian: boolean;
    public vegan: boolean;
    public glutenFree: boolean;
    public dairyFree: boolean;
    public extendedIngredients: Ingredient[];
    public title: string;
    public sourceUrl: string;
    public servings: number;
    public readyInMinutes: number;
    public image: string= 'assets/images/no-image.jpeg';
    public instructions: string;
    public analyzedInstructions: any[];

}
