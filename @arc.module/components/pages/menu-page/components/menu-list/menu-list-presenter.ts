import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { MenuPageService } from '../../../../../services/menu-page.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { IMenu } from '@arc.module/models/interfaces/menu.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';
@Component({

  selector: 'menu-list-presenter',
  template: `
  <menu-list-view
  [selectedUnit]="_selectedUnit"
  [menus]="menus"
  (menuRefresh)="refreshMenus()"
  (menuRemoved)="MenuRemoved($event)"
  (menuReOrdered)="MenuReOrdered($event)"

  >
  </menu-list-view>
  `,
})
export class MenuListPresenter implements OnInit {

  _selectedUnit: IUnit;
  menus: IMenu[] = [];
  @Input() set selectedUnit(value: IUnit) {
    if (value) {
      this._selectedUnit = value;
      this.menuPageService.GetAllMenus(value).then(res => this.menus = res);
    }
  }

  constructor(private menuPageService: MenuPageService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }


  async MenuRemoved(menu: IMenu) {
    let menuToDelete: IMenu = { ...menu }
    menuToDelete.menuId *= -1;
    var res: IServerResponse = await this.menuPageService.ModifyMenu(menuToDelete);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.refreshMenus();
    }
  }

  async MenuReOrdered(menuOrder: number[]) {
    var res: IServerResponse = await this.menuPageService.MenuReOrdered(menuOrder);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.refreshMenus();
    }
  }

  async refreshMenus() {
    this.menus = [];
    this.menus = await this.menuPageService.GetAllMenus(this._selectedUnit);
  }

}
