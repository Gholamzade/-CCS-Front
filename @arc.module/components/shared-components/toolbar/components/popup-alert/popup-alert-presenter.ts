import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserPageService } from '../../../../../services/user-page.service'
import { MatSnackBar } from '@angular/material/snack-bar';

import { AlertDefinitionService } from '../../../../../services/alert.service';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';

@Component({

  selector: 'popup-alert-presenter',
  template: `
  <popup-alert-view
  [alertLog]="_alertLog"
  (result)="logConfirmed()"
  >
  </popup-alert-view>
  `,
})
export class PopupAlertPresenter implements OnInit {

  _alertLog: IAlertLogItem;

  constructor(
    private alertService: AlertDefinitionService,
    private userPageService: UserPageService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PopupAlertPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: IAlertLogItem
  ) {
    if (data != null) {
      this._alertLog = data;
    }
  }

  async ngOnInit() {

  }

  async logConfirmed() {
    let res: IServerResponse = await this.alertService.alertLogConfirm(this._alertLog.alertLogId);
    if (res.telId === 200 || res.telId === -13) {
      this.dialogRef.close(this._alertLog);
    }
  }
}
