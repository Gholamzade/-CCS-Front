import { Injectable } from '@angular/core';
import { ArcTelegramService } from './arcTelegram.service';

import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';
import { Telegram } from '@arc.module/models/classes/telegram.class';


@Injectable({
  providedIn: 'root'
})
export class TelegramDefinitionPageService {

  constructor(private telService: ArcTelegramService) { }


  GetTelegrams() {
    let telegrams: ITelegram[] = [];
    const obj = new Telegram(10, "");
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        telegrams.push(element);
      });
      return telegrams;
    });
  }

  ModifyTelegram(telegram: ITelegram) {
    const obj = new Telegram(11, telegram);
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


