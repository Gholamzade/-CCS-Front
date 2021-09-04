import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MenuPageService } from '../../../../../services/menu-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISubmenu } from '@arc.module/models/interfaces/submenu.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
@Component({

  selector: 'submenu-add-edit-modal-presenter',
  template: `
  <submenu-add-edit-modal-view
    [submenu]="_submenu"
    [selectedGroupsId]="_selectedGroupsId"
    (result)="submitSubmenu($event)"
  >
  </submenu-add-edit-modal-view>
  `,
})
export class SubmenuAddEditModalPresenter implements OnInit {

  _submenu: ISubmenu;
  _selectedGroupsId: number[] = [];

  constructor(private menuPageService: MenuPageService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SubmenuAddEditModalPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: ISubmenu) {
    if (data != null) {
      this._submenu = data;
      this._submenu.connectUgSubmenu.forEach(element => {
        this._selectedGroupsId.push(element.userGroupFk)
      });
    }
  }

  ngOnInit() {
  }

  async submitSubmenu(submenu: ISubmenu) {
    if (submenu) {
      let res: IServerResponse = await this.menuPageService.ModifySubmenu(submenu);
      this.snackBar.open(res.message, '', { duration: 2000 });
      if (res.telId === 200) {
        this.dialogRef.close(submenu);
      }
    }
  }

}
