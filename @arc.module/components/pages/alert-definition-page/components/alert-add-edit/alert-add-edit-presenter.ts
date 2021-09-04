import { Component, OnInit, Inject } from '@angular/core';

import { AlertDefinitionService } from '../../../../../services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertLogService } from '../../../../../services/alert-log.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IAlert } from '@arc.module/models/interfaces/alert.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';


@Component({
  selector: 'alert-add-edit-presenter',
  template: `<alert-add-edit-view
      [alert]="alert"
      [alertTypes]="alertTypes"
      [isInEditMode]="isInEditMode"
      [selectedGroupsId]="selectedGroupsId"
      (result)="manageModalButtons($event)" >
      </alert-add-edit-view>`
})

export class AlertAddEditPresenter implements OnInit {

  alert: IAlert;
  alertTypes = [];
  isInEditMode: boolean = false;
  selectedGroupsId: number[] = [];


  userGroups: IUserGroup[];
  constructor(private snackBar: MatSnackBar,
    private alertLogService: AlertLogService,
    private alertDefinitionService: AlertDefinitionService,
    public dialogRef: MatDialogRef<AlertAddEditPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: IAlert) {
    if (data) {
      this.alert = data as IAlert;
      this.alert.restrictedUgAlert.forEach(element => {
        this.selectedGroupsId.push(element.userGroupFk)
      });
      if (this.alert.alertId) {
        this.isInEditMode = true;
      }
    }
  }

  async ngOnInit() {
    this.alertTypes = await this.alertLogService.alertTypeList;
  }

  async manageModalButtons(alert: IAlert) {
    if (alert) {
      let res: IServerResponse = await this.alertDefinitionService.ModifyAlert(alert);
      this.snackBar.open(res.message, '', { duration: 2000 });
      if (res.telId === 200) {
        this.dialogRef.close(alert);
      }
    }
    else {
      this.dialogRef.close(null);
    }
  }

}
