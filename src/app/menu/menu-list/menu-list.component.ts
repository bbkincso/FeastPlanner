import { Component, OnInit } from '@angular/core';
import {MenuListItem} from "../../models/menu-list-item-model";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menuList: MenuListItem[];
  user: string;

  constructor(private menuService: MenuService) {
      this.menuService.userSubject.subscribe((resp) => {
          this.user = resp;
      })
  }

  ngOnInit(): void {
      //console.log(this.user);
      this.menuService.getMenuList(this.user)
        .subscribe((response) => {
          this.menuList = response;
        })
  }

}
