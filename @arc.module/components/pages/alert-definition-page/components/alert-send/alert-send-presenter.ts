import { Component, OnInit, Inject } from '@angular/core';

import { AlertDefinitionService } from '../../../../../services/alert.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IAlertSimulate } from '@arc.module/models/interfaces/alert-simulate.interface';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';


@Component({
  selector: 'alert-send-presenter',
  template: `<alert-send-view
  [alert]="alert"
  (result)="manageModalButtons($event)"
      >
    </alert-send-view>`
})

export class AlertSendPresenter implements OnInit {
  alert: IAlert;

  constructor(
    private alertDefinitionService: AlertDefinitionService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AlertSendPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: IAlert
  ) {
    if (data) {
      this.alert = data as IAlert;
    }
  }

  async ngOnInit() {

  }

  async manageModalButtons(simulateAlert: IAlertSimulate) {
    if (simulateAlert) {
      let res: IServerResponse = await this.alertDefinitionService.SendAlert(simulateAlert);
      this.snackBar.open(res.message, '', { duration: 2000 });
    }
    this.dialogRef.close(null);
  }

}
