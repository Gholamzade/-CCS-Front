import { IUserToGroup } from '@arc.module/models/interfaces/user-to-group.interface';
import { Component, OnInit } from '@angular/core';
import { UserPageService } from '../../../services/user-page.service';


import { MatSnackBar } from '@angular/material/snack-bar';

import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUserEdit } from '@arc.module/models/interfaces/user-edit.interface';
import { IUser } from '@arc.module/models/interfaces/user.interface';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';


@Component({
  selector: 'user-page-presenter',
  template: `<user-page-view
  [Groups]="Groups"
  [Users]="Users"
  (SelectedGroupChanged)="SelectedGroupChanged($event)"
  (UserGroupRemoved)="GroupRemoved($event)"
  (UserGroupRefresh)="RefreshGroupList()"
  (UserRemoved)="UserRemoved($event)"
  (UserRefresh)="RefreshUserList()"
   (GroupOfUserChanged)="GroupOfUserChanged($event)" >
   </user-page-view>`
})
export class UserPagePresenter implements OnInit {

  Groups: IUserGroup[] = [];
  Users: IUser[] = [];
  selectedGroup: IUserGroup;


  constructor(private userPageService: UserPageService,
    private snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    this.Groups = await this.userPageService.GetAllGroups();
  }

  async GroupRemoved(group: IUserGroup) {
    let groupToDelete: IUserGroup = { ...group };
    groupToDelete.userGroupId *= -1;
    var res: IServerResponse = await this.userPageService.ModifyUserGroup(groupToDelete);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshGroupList();
    }
  }

  async RefreshGroupList() {
    this.Users = [];
    this.Groups = await this.userPageService.GetAllGroups();
  }

  async SelectedGroupChanged(group: IUserGroup) {
    this.Users = [];
    this.Users = await this.userPageService.GetAllUsers(group);
    this.selectedGroup = group;
  }

  async RefreshUserList() {
    this.Users = [];
    this.Users = await this.userPageService.GetAllUsers(this.selectedGroup);
  }

  async UserRemoved(user: IUser) {
    let userEdit: IUserEdit = {
      user: { ...user },
      changePassword: false
    }
    userEdit.user.userId *= -1;
    var res: IServerResponse = await this.userPageService.ModifyUser(userEdit);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshUserList();
    }
  }

  async GroupOfUserChanged(userToGroup: IUserToGroup) {

    let editedUser: IUserEdit = {
      user: { ...userToGroup.User },
      changePassword: false
    }
    editedUser.user.userGroupFk = (userToGroup.Group) ? userToGroup.Group.userGroupId : null;
    var res: IServerResponse = await this.userPageService.ModifyUser(editedUser);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshUserList();
    }
  }

}
