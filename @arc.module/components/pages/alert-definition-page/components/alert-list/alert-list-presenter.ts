import { IAlertType } from '@arc.module/models/interfaces/alert-type.interface';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AlertDefinitionService } from '../../../../../services/alert.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertLogService } from '../../../../../services/alert-log.service';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';



@Component({
  selector: 'alert-list-presenter',
  template: `<alert-list-view
      [alerts]="alerts"
      [alertTypes]="alertTypes"
      (alertsRefresh)="ngOnInit()"
      (alertRemoved)="alertRemove($event)"

      >
    </alert-list-view>`
})

export class AlertListPresenter implements OnInit {

  alerts: IAlert[] = [];
  alertTypes: IAlertType[] = [];
  constructor(private alertDefinitionService: AlertDefinitionService,
    private alertLogService: AlertLogService,
    private snackBar: MatSnackBar) {

  }

  async ngOnInit() {
    this.alerts = await this.alertDefinitionService.getAlerts();
    this.alertTypes = await this.alertLogService.alertTypeList;
  }

  async alertRemove(alert: IAlert) {
    let alertToRemove: IAlert = { ...alert }
    alertToRemove.alertId *= -1;
    var res: IServerResponse = await this.alertDefinitionService.ModifyAlert(alertToRemove);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.ngOnInit();
    }
  }

  async alertSend(alert: IAlert) {
    var res: IServerResponse = await this.alertDefinitionService.ModifyAlert(alert);
    this.snackBar.open(res.message, '', { duration: 2000 });
  }


}
