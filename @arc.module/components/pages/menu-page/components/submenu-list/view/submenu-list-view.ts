import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { SubmenuAddEditModalPresenter } from '../../submenu-add-edit/submenu-add-edit-modal-presenter';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalView } from '../../../../../shared-components/Confirm/view/confirm-modal-view';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ISubmenu } from '@arc.module/models/interfaces/submenu.interface';
import { IMenu } from '@arc.module/models/interfaces/menu.interface';
import { DialogService } from "@arc.module/services/dialog.service";
import { ConfirmModal } from '@arc.module/models/interfaces/confirm-modal';
@Component({
  selector: 'submenu-list-view',
  templateUrl: './submenu-list-view.html',
  styleUrls: ['./submenu-list-view.scss']
})
export class SubmenuListView implements OnInit {
  _submenus: ISubmenu[] = []
  _tempSubmenusBeforeReorder: ISubmenu[] = [];
  @Input() selectedMenu: IMenu;
  @Output() submenuReOrdered = new EventEmitter<number[]>();
  @Output() subMenuRemoved = new EventEmitter<ISubmenu>();
  @Output() submenuRefresh = new EventEmitter<any>();

  @Input() set submenus(value: ISubmenu[]) {
    this._submenus = value;
  }

  subMenuEditOrderMode = false;

  constructor(public dialog: MatDialog, private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  AddSubMenu() {
    let tempPosition = 1;
    this._submenus.forEach(element => {
      if (element.position > tempPosition)
        tempPosition = element.position
    });
    let newSubmenu: ISubmenu = {
      submenuId: 0,
      position: tempPosition + 1,
      captionEn: "",
      captionFa: "",
      titleEn: "",
      titleFa: "",
      menuFk: this.selectedMenu.menuId,
      route: "",
      shortcut: 0,
      connectUgSubmenu: []
    }
    const dialogRef = this.dialog.open(SubmenuAddEditModalPresenter, {
      maxWidth: '700px',
      data: newSubmenu
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) // added successfully
      {
        this.submenuRefresh.emit(true);
      }
    });
  }

  RemoveSubMenu(submenu: ISubmenu) {
    let data: ConfirmModal = {
      message: `Are you sure you want to remove the ${submenu.titleEn} submenu?`,
      inputData: submenu,
      messageType: 'danger',
      title: `remove the ${submenu.titleEn}`,
      cancelText: 'NO',
      confirmText: 'YES'
    }
    this.dialogService.confirm(data).then(res => {
      console.warn('res: ', res);
      if (res.result) {
        this.subMenuRemoved.emit(submenu);
      }
    }).catch(err => console.error(err))
    // const dialogRef = this.dialog.open(ConfirmModalView, {
    //   data: `Are you sure you want to remove the ${submenu.titleEn} ?`
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {// user pressed ok
    //     this.subMenuRemoved.emit(submenu);
    //   }
    // });
  }

  EditSubMenu(submenu: ISubmenu) {
    let submenuToEdit: ISubmenu = { ...submenu };
    const dialogRef = this.dialog.open(SubmenuAddEditModalPresenter, {
      maxWidth: '700px',
      data: submenuToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) // edited successfully
      {
        this.submenuRefresh.emit(true);
      }
    });

  }

  SaveSubMenuOrder() {
    let positions: number[] = [];
    this._submenus.forEach(element => {
      positions.push(element.submenuId);
    });
    this.submenuReOrdered.emit(positions);
  }

  toggleSubMenu() {
    if (!this.subMenuEditOrderMode) {
      this._tempSubmenusBeforeReorder = [];
      Object.assign(this._tempSubmenusBeforeReorder, this._submenus);
    }
    this.subMenuEditOrderMode = !this.subMenuEditOrderMode;
  }

  resetSubmenuOrder() {
    Object.assign(this._submenus, this._tempSubmenusBeforeReorder);
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
