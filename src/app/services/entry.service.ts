import { Injectable } from '@angular/core';
import { TelegramService } from "@arc.module/services/telegram.service";
@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private telegramService: TelegramService) { }

  getResumptions() {
    return this.telegramService.send({
      telId: 1000,
      telData: {}
    })
  }

  delete(
    coilId: number
  ) {
    return this.telegramService.send({
      telId: 1071,
      telData: { coilId }
    });
  }

}
