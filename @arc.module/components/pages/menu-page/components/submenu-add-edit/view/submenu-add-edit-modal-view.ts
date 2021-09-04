import { Component, Inject, HostListener, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConnectUgSubmenu } from '@arc.module/models/interfaces/connect-ug-submenu.interface';
import { ISubmenu } from '@arc.module/models/interfaces/submenu.interface';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';




@Component({
  selector: 'submenu-add-edit-modal-view',
  templateUrl: './submenu-add-edit-modal-view.html',
  styleUrls: ['./submenu-add-edit-modal-view.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class SubmenuAddEditModalView implements OnInit {

  @Input() submenu: ISubmenu;
  @Input() selectedGroupsId: number[] = [];
  @Output() result = new EventEmitter<ISubmenu>();

  constructor() {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // if (!this._menu.Shortcut)
    //   this._menu.Shortcut = "";
    // if (event.shiftKey)
    //   this._menu.Shortcut += "Shift+";
    // if (event.ctrlKey)
    //   this._menu.Shortcut += "Ctrl+";
  }

  ngOnInit(): void {
  }


  onOkClick(): void {
    this.result.emit(this.submenu);
  }

  onSelectedGroupsChange(groups: IUserGroup[]) {
    this.submenu.connectUgSubmenu = [];
    groups.forEach(element => {
      const connectUgSubmenu: IConnectUgSubmenu = {
        connectUserGroupSubmenuId: 0,
        submenuFk: this.submenu.submenuId,
        userGroupFk: element.userGroupId
      }
      this.submenu.connectUgSubmenu.push(connectUgSubmenu);
    });
  }
}
