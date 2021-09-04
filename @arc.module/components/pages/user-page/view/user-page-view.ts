import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';



import { ConfirmModalView } from '../../../shared-components/Confirm/view/confirm-modal-view';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { GroupAddEditPresenter } from '../components/group-add-edit/group-add-edit-presenter'
import { UserAddEditPresenter } from '../components/user-add-edit/user-add-edit-presenter';
import { IUser } from '@arc.module/models/interfaces/user.interface';
import { IUserToGroup } from '@arc.module/models/interfaces/user-to-group.interface';



@Component({
  selector: 'user-page-view',
  templateUrl: './user-page-view.html',
  styleUrls: ['./user-page-view.scss']
})
export class UserPageView implements OnInit {

  @Input() Groups: IUserGroup[] = [];
  @Input() Users: IUser[] = [];
  @Output() SelectedGroupChanged = new EventEmitter<IUserGroup>();
  @Output() UserGroupRefresh = new EventEmitter<any>();
  @Output() UserGroupRemoved = new EventEmitter<IUserGroup>();
  @Output() UserRefresh = new EventEmitter<any>();
  @Output() UserRemoved = new EventEmitter<IUser>();
  @Output() GroupOfUserChanged = new EventEmitter<IUserToGroup>();

  selectedGroup: IUserGroup;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  onGroupChange() {
    this.SelectedGroupChanged.emit(this.selectedGroup);
  }



  AddUserGroup() {
    let newGroup: IUserGroup = {
      userGroupId: 0,
      title: ""
    };
    const dialogRef = this.dialog.open(GroupAddEditPresenter, {
      width: '250px',
      data: newGroup
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { //submit without error
        this.UserGroupRefresh.emit(true);
      }
    });
  }

  EditUserGroup(group: IUserGroup): void {
    let newGroupToEdit: IUserGroup = {
      userGroupId: group.userGroupId,
      title: group.title
    };

    const dialogRef = this.dialog.open(GroupAddEditPresenter, {
      width: '250px',
      data: newGroupToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { //submit without error
        this.UserGroupRefresh.emit(true);
      }
    });

  }

  RemoveUserGroup(group: IUserGroup): void {
    const dialogRef = this.dialog.open(ConfirmModalView, {
      data: `Are you sure you want to remove ${group.title} user group?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // user pressed ok
        this.UserGroupRemoved.emit(group);
      }
    });

  }

  AddUser(group: IUserGroup) {
    let newUser: IUser = {
      family: "",
      name: "",
      password: "",
      userId: 0,
      username: ""
    };
    if (group) {
      newUser.userGroupFk = group.userGroupId;
    }
    const dialogRef = this.dialog.open(UserAddEditPresenter, {
      maxWidth: '700px',
      data: newUser
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { //submit without error
        this.UserRefresh.emit(true);
      }
    });
  }

  EditUser(user: IUser): void {
    let newUserToEdit: IUser = {
      name: user.name,
      family: user.family,
      userId: user.userId,
      username: user.username,
      isActive: user.isActive,
      isService: user.isService,
      userGroupFk: user.userGroupFk,
      shiftTeamFk: user.shiftTeamFk,
      password: ""
    };

    const dialogRef = this.dialog.open(UserAddEditPresenter, {
      maxWidth: '700px',
      data: newUserToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { //submit without error
        this.UserRefresh.emit(true);
      }
    });

  }

  RemoveUser(user: IUser): void {

    const dialogRef = this.dialog.open(ConfirmModalView, {
      data: `Are you sure you want to remove ${user.name} ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) // user pressed ok
        this.UserRemoved.emit(user);
    });

  }

  ChangeGroupOfUser(user: IUser, group?: IUserGroup) {
    let message;
    if (group) { //add to user group
      message = `Are you sure you want to add ${user.name} to ${this.selectedGroup.title} group ?`;
    }
    else { // remove from user group
      message = `Are you sure you want to remove ${user.name} from ${this.selectedGroup.title} group ?`;
    }
    const dialogRef = this.dialog.open(ConfirmModalView, {
      data: message
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) // user pressed ok
      {
        let userToGroup: IUserToGroup = {
          User: user,
          Group: group
        }
        this.GroupOfUserChanged.emit(userToGroup);
      }
    });
  }



  assignedUsers(): IUser[] {
    return this.Users.filter(x => x.userGroupFk)
  }
  unassignedUsers(): IUser[] {
    return this.Users.filter(x => !x.userGroupFk)
  }
}
