import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';


import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserPageService } from '../../../../../services/user-page.service'
import { MatSnackBar } from '@angular/material/snack-bar';

import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUserEdit } from '@arc.module/models/interfaces/user-edit.interface';
import { IUser } from '@arc.module/models/interfaces/user.interface';

@Component({

  selector: 'user-add-edit-presenter',
  template: `
  <user-add-edit-view
    [user]="_user"
    [allUsers]="_allUsers"
    (result)="submitUser($event)"
  >
  </user-add-edit-view>
  `,
})
export class UserAddEditPresenter implements OnInit {

  _user: IUser;
  _allUsers: IUser[] = [];

  constructor(private userPageService: UserPageService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserAddEditPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) {
    if (data != null) {
      this._user = data;
    }
  }

  async ngOnInit() {
    let groups: IUserGroup[] = await this.userPageService.GetAllGroups();
    groups.forEach(async group => {
      let users = await this.userPageService.GetAllUsers(group);
      users.forEach(user => {
        if (!this._allUsers.find(x => x.userId === user.userId)) {
          this._allUsers.push(user);
        }
      });
    });
  }

  async submitUser(userEdit: IUserEdit) {
    let res: IServerResponse = await this.userPageService.ModifyUser(userEdit);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.dialogRef.close(userEdit);
    }
  }

}
