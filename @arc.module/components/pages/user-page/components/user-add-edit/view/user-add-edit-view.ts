import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IUserEdit } from '@arc.module/models/interfaces/user-edit.interface';
import { IUser } from '@arc.module/models/interfaces/user.interface';


@Component({
  selector: 'user-add-edit-view',
  templateUrl: 'user-add-edit-view.html',
  styleUrls: ['user-add-edit-view.scss']
})
export class UserAddEditView {
  @Input() user: IUser;
  @Input() allUsers: IUser[];
  @Output() result = new EventEmitter<IUserEdit>();

  confirmPassword: string;
  isPasswordChanged: boolean = false;
  takenUsername: boolean = false;

  constructor() {
  }

  onOkClick(): void {
    let userEdit: IUserEdit = {
      changePassword: this.isPasswordChanged,
      user: this.user
    };
    this.result.emit(userEdit);
  }

  usernameChanged() {
    if (this.user.username.trim() === "") {
      this.takenUsername = false;
    }
    else {
      if (this.allUsers.find(x => x.username.toLowerCase() === this.user.username.toLowerCase())) {
        this.takenUsername = true;
      }
      else {
        this.takenUsername = false;
      }
    }
  }

}
