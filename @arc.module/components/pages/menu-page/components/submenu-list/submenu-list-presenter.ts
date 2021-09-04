import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MenuPageService } from '../../../../../services/menu-page.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { IMenu } from '@arc.module/models/interfaces/menu.interface';
import { ISubmenu } from '@arc.module/models/interfaces/submenu.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
@Component({

  selector: 'submenu-list-presenter',
  template: `
  <submenu-list-view
    [submenus]="submenus"
    [selectedMenu]="_selectedMenu"
    (submenuReOrdered)="SubmenuReOrdered($event)"
    (submenuRefresh)="RefreshSubmenu()"
    (subMenuRemoved)="SubMenuRemoved($event)"
  >
  </submenu-list-view>
  `,
})
export class SubmenuListPresenter implements OnInit {
  _selectedMenu: IMenu;
  submenus: ISubmenu[] = [];

  @Input() set menu(value: IMenu) {
    this._selectedMenu = value;
    this.RefreshSubmenu();
  }

  constructor(private menuPageService: MenuPageService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }

  async SubMenuRemoved(submenu: ISubmenu) {
    let submenuToDelete: ISubmenu = { ...submenu }
    submenuToDelete.submenuId *= -1;
    var res: IServerResponse = await this.menuPageService.ModifySubmenu(submenuToDelete);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshSubmenu();
    }
  }

  async SubmenuReOrdered(submenuOrder: number[]) {
    var res: IServerResponse = await this.menuPageService.SubmenuReOrdered(submenuOrder);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshSubmenu();
    }
  }

  async RefreshSubmenu() {
    this.submenus = [];
    this.menuPageService.GetSubMenus(this._selectedMenu).then(res => this.submenus = res);
  }



}
