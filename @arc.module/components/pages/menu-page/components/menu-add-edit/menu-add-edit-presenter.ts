import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuPageService } from '../../../../../services/menu-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IMenu } from '@arc.module/models/interfaces/menu.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';

@Component({

  selector: 'menu-add-edit-presenter',
  template: `
  <menu-add-edit-view
    [menu]="_menu"
    (result)="submitMenu($event)"
  >
  </menu-add-edit-view>
  `,
})
export class MenuAddEditPresenter implements OnInit {

  _menu: IMenu;
  constructor(private snackBar: MatSnackBar,
    private menuPageService: MenuPageService,
    public dialogRef: MatDialogRef<MenuAddEditPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: IMenu) {
    if (data != null) {
      this._menu = data;
    }
  }

  ngOnInit() {
  }

  async submitMenu(menu: IMenu) {
    if (menu) {
      let res: IServerResponse = await this.menuPageService.ModifyMenu(menu);
      this.snackBar.open(res.message, '', { duration: 2000 });
      if (res.telId === 200) {
        this.dialogRef.close(menu);
      }
    }
  }

}
