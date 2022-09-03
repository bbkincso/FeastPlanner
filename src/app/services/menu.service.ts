import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeListItem} from "../models/recipe-list-item.model";
import {map} from "rxjs/operators";
import {MenuListItem} from "../models/menu-list-item-model";
import {BehaviorSubject, Observable} from "rxjs";
import {RecipeDetails} from "../models/recipeDetails.model";

@Injectable({providedIn:'root'})
export class MenuService {

    userSubject = new BehaviorSubject<string>('');
    menuRecipes: RecipeDetails[] =[];
    onSelectedMenu = new BehaviorSubject(<any>(''));

    public menuList: any[];

    constructor(private http: HttpClient) {
    }

    getMenuList(user: String) {
        return this.http
            .get<MenuListItem[]>('http://localhost:8080/menus/user/'+user)
            .pipe(
                map(responseData => {
                    // console.log(responseData);
                    const response: any[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            response.push({...responseData[key]})
                        }
                    }
                    console.log(response);
                    return response;
                }))
    }

    saveMenu(menu: MenuListItem) {
        return this.http.post<MenuListItem>('http://localhost:8080/menus', menu)
            .subscribe(respponseData => {
            });
        // add error handling!
    }

    // editMenu() {}
    //


    deleteMenu(id: number) {
        return this.http.delete('http://localhost:8080/menus/' + id);
    }

    getPriceOfItem(itemName: string) {
        return this.http
            .get<any>('http://localhost:8082/' + itemName)
            .pipe(
                map(responseData => {
                    return responseData;
                }))
    }

}
