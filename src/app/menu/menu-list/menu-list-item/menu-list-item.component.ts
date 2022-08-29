import {Component, Input, OnInit} from '@angular/core';
import {Menu} from "../../../models/menu.model";
import {MenuService} from "../../../services/menu.service";
import {MenuListItem} from "../../../models/menu-list-item-model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.css']
})
export class MenuListItemComponent implements OnInit {
  @Input() menuListItem: MenuListItem;

  constructor(private menuService: MenuService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  deleteListItem(id: number) {
    this.menuService.deleteMenu(id).subscribe();
    //this.menuService.onChangedMenuList.emit();
  }

  selectMenuItem(menuListItem: MenuListItem) {
    //console.log(menuListItem);
    this.menuService.onSelectedMenu.next(menuListItem);
    this.router.navigate([ menuListItem.id], {relativeTo: this.route});
  }
}
