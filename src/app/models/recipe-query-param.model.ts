export class RecipeQueryParamModel {
    query: string;
    excludeIngredients: string;
    intolerances: string;
    diet: string;
    cuisine: string;
    type: string;
    number: string = '5';
    offset: string = '0';
}
