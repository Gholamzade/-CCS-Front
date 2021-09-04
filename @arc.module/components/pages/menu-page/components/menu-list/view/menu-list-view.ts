import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalView } from '../../../../../shared-components/Confirm/view/confirm-modal-view';
import { MenuAddEditPresenter } from '../../menu-add-edit/menu-add-edit-presenter';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IMenu } from '@arc.module/models/interfaces/menu.interface';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';

@Component({
  selector: 'menu-list-view',
  templateUrl: './menu-list-view.html',
  styleUrls: ['./menu-list-view.scss']
})
export class MenuListView implements OnInit {
  @Input() selectedUnit: IUnit;
  _menus: IMenu[] = [];
  _tempMenusBeforeReorder: IMenu[] = [];
  @Input() set menus(value: IMenu[]) {
    this._menus = value;
    this.mainMenuEditOrderMode = false;
  }
  // @Output() menuSelected = new EventEmitter<Menu>();
  @Output() menuRefresh = new EventEmitter<any>();
  @Output() menuRemoved = new EventEmitter<IMenu>();
  @Output() menuReOrdered = new EventEmitter<number[]>();
  mainMenuEditOrderMode: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  AddMenu() {
    let tempPosition = 1;
    this._menus.forEach(element => {
      if (element.position > tempPosition)
        tempPosition = element.position
    });
    let newMenu: IMenu = {
      menuId: 0,
      unitFk: this.selectedUnit.unitId,
      position: tempPosition + 1,
      captionEn: "",
      captionFa: "",
      titleEn: "",
      titleFa: ""
    }
    const dialogRef = this.dialog.open(MenuAddEditPresenter, {
      width: '250px',
      data: newMenu
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) // added successfully
      {
        this.menuRefresh.emit(true);
      }
    });
  }

  EditMenu(menu: IMenu) {
    let menuToEdit: IMenu = { ...menu };
    const dialogRef = this.dialog.open(MenuAddEditPresenter, {
      width: '250px',
      data: menuToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) // added successfully
      {
        this.menuRefresh.emit(true);
      }
    });

  }

  RemoveMenu(menu: IMenu) {
    const dialogRef = this.dialog.open(ConfirmModalView, {
      data: `Are you sure you want to remove the ${menu.titleEn} ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {// user pressed ok
        this.menuRemoved.emit(menu);
      }
    });

  }



  SaveMenuOrder() {
    let positions: number[] = [];
    this._menus.forEach(element => {
      positions.push(element.menuId);
    });
    this.menuReOrdered.emit(positions);
  }



  toggleMenu() {
    if (!this.mainMenuEditOrderMode) {
      this._tempMenusBeforeReorder = [];
      Object.assign(this._tempMenusBeforeReorder, this._menus);
    }
    this.mainMenuEditOrderMode = !this.mainMenuEditOrderMode;
  }

  resetMenuOrder() {
    Object.assign(this._menus, this._tempMenusBeforeReorder);
  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
