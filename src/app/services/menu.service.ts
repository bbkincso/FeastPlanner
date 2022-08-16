import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn:'root'})
export class MenuService {

    onAddRecipe = new EventEmitter<any>();
    onNewAddedRecipe = new EventEmitter<any>();



    constructor(private http: HttpClient) {
    }



    // getMenuList() {}
    //
    // getMenu() {}
    //
    // saveMenu() {}
    //
    // editMenu() {}
    //
    // deleteMenu() {}

}
