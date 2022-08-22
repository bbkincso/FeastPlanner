import {EventEmitter, Injectable} from "@angular/core";
import {RecipeListItem} from "../models/recipe-list-item.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, filter, map} from "rxjs/operators";
import {RecipeDetails} from "../models/recipeDetails.model";
import {FormArray, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeService {

    onSelectedUrl = new BehaviorSubject<any>('');
    // onAddedRecipe = new EventEmitter<RecipeDetails>();
    onAddedFilters = new EventEmitter<any>();
    onDisplayChange = new BehaviorSubject<string>('select');

    //public recipeList: any;
    baseUri: any;

    private recipeList2: RecipeListItem[] = [
        new RecipeListItem('Cabbage Salad with Peanuts', 'cabbage-salad-with-peanuts-723984.jpg',
            'http://naturallyella.com/cabbage-salad-with-peanuts/',10),
        new RecipeListItem('Stuffed Sweet Potato with Spinach, Hummus & Feta', 'Stuffed-Sweet-Potato-with-Spinach--Hummus---Feta-584549.jpg',
            'http://www.cookincanuck.com/2013/09/stuffed-sweet-potato-recipe-with-spinach-hummus-feta/', 10),
        new RecipeListItem('Cilantro Salsa', 'Cilantro-Salsa-667917.jpg',
            'http://www.thegraciouspantry.com/clean-eating-cilantro-salsa/', 20),
    ];

    constructor(private http: HttpClient) {
    }

    getRecipes() {
        return this.recipeList2.slice();
    }

    getBaseUri() {
        return this.http
            .get<any>('http://localhost:8085/all-recipes')
            .pipe(
                map(responseData => {
                    return responseData.baseUri;
                }));
    }

    getRecipeList(myUrl: string) {
        return this.http
            .get<RecipeListItem[]>(myUrl)
            .pipe(
                map(responseData => {
                    // console.log(responseData);
                    const response: any[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            response.push({...responseData[key]})
                        }
                    }
                   return response;
                })).pipe(map(resp => {
                    const recipeList: RecipeListItem[] = [];
                    for (const key in resp[1]) {
                        if (resp[1].hasOwnProperty(key)) {
                            recipeList.push({...resp[1][key]})
                        }
                    }
                     console.log(recipeList, 'RESP');
                    return recipeList;
                }))
    }

    getRecipeDetails(url: string) {
        return this.http
            .get<RecipeDetails>('http://localhost:8085/recipe',
                {
                    params: new HttpParams().set('url', url)
                }
            )
            .pipe(
                map(responseData => {
                    return responseData;

                }))
    }

}
