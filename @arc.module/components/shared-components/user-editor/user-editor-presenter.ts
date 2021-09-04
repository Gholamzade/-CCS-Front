import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPageService } from '../../../services/user-page.service';
import { IModifyUser } from '@arc.module/models/interfaces/modify-user.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
@Component({

  selector: 'user-editor-presenter',
  template: `
  <user-editor-view
    [user]="_user"
    (userEdited)="editUser($event)"
  >
  </user-editor-view>
  `,
})
export class UserEditorPresenter implements OnInit {

  _user: IModifyUser;

  constructor(
    private snackBar: MatSnackBar,
    private userPageService: UserPageService,
    public dialogRef: MatDialogRef<UserEditorPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: IModifyUser
  ) {
    if (data != null) {
      this._user = data;
    }
  }

  async ngOnInit() {

  }

  async editUser(userEdit: IModifyUser) {
    let res: IServerResponse = await this.userPageService.ModifyCurrentUser(userEdit);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.dialogRef.close(userEdit);
    }
  }

}
