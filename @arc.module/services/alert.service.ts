import { IAlertSimulate } from '@arc.module/models/interfaces/alert-simulate.interface';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';


import { Injectable } from "@angular/core";

import { ArcTelegramService } from './arcTelegram.service';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { Telegram } from '@arc.module/models/classes/telegram.class';



@Injectable({
  providedIn: "root"
})
export class AlertDefinitionService {
  constructor(private telService: ArcTelegramService) { }


  getAlerts() {
    let alerts: IAlert[] = [];
    const obj = new Telegram(12, "");
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        alerts.push(element);
      });
      return alerts;
    });
  }

  ModifyAlert(alert: IAlert) {
    const obj = new Telegram(13, alert);
    return this.telService.send(obj).then(res => {
      // if (res.telId === 200) {
      // }
      let res2: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return res2;
    });
  }

  SendAlert(simulateAlert: IAlertSimulate) {
    const obj = new Telegram(15, simulateAlert);
    return this.telService.send(obj).then(res => {
      // if (res.telId === 200) {
      // }
      let res2: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return res2;
    });
  }

  alertLogConfirm(logId: number) {

    const obj = new Telegram(30, { "logId": logId });
    return this.telService.send(obj).then(res => {
      // if (res.telId === 200) {
      // }
      let res2: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return res2;
    });
  }
}
