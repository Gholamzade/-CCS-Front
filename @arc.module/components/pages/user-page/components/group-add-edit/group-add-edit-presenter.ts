import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserPageService } from '../../../../../services/user-page.service'
import { MatSnackBar } from '@angular/material/snack-bar';

import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';
import { Subject } from 'rxjs';

@Component({

  selector: 'group-add-edit-presenter',
  template: `
  <group-add-edit-view
    [group]="group"
    (result)="submitGroup($event)"
  >
  </group-add-edit-view>
  `,
})
export class GroupAddEditPresenter implements OnInit {

  private _group: IUserGroup
  @Input() set group(val: IUserGroup) {
    if (val) {
      this._group = val;
    }
  };
  get group(): IUserGroup {
    return this._group
  }
  constructor(private userPageService: UserPageService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GroupAddEditPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: IUserGroup) {

  }

  ngOnInit() {
    if (this.data != null) {
      this.group = this.data;
    }
  }

  async submitGroup(group: IUserGroup) {
    if (group) {
      let res: IServerResponse = await this.userPageService.ModifyUserGroup(group);
      this.snackBar.open(res.message, '', { duration: 2000 });
      if (res.telId === 200) {
        this.dialogRef.close(group);
      }
    }
  }

}
