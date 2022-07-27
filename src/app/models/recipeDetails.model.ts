import { isNil } from 'lodash-es';
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

    constructor(config: any) {
        this.updateFromServerData(config);
    }

    updateFromServerData(config: any) {
        this.vegetarian = !isNil(config.vegetarian) ? config.vegetarian : this.vegetarian;
        this.vegan = !isNil(config.vegan) ? config.vegan : this.vegan;
        this.glutenFree = !isNil(config.glutenFree) ? config.glutenFree : this.glutenFree;
        this.dairyFree = !isNil(config.dairyFree) ? config.dairyFree : this.dairyFree;
        this.extendedIngredients = !isNil(config.extendedIngredients) ? config.extendedIngredients : this.extendedIngredients;
        this.title = !isNil(config.title) ? config.title : this.title;
        this.sourceUrl = !isNil(config.sourceUrl) ? config.sourceUrl : this.sourceUrl;
        this.servings = !isNil(config.servings) ? config.servings : this.servings;
        this.readyInMinutes = !isNil(config.readyInMinutes) ? config.readyInMinutes : this.readyInMinutes;
        this.image = !isNil(config.image) ? config.image : this.image;
        this.instructions = !isNil(config.instructions) ? config.instructions : this.instructions;
        this.analyzedInstructions = !isNil(config.analyzedInstructions) ? config.analyzedInstructions : this.analyzedInstructions;

    }
}
