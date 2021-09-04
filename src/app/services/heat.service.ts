import { Injectable } from '@angular/core';
import { TelegramService } from '@arc.module/services/telegram.service';

@Injectable({
  providedIn: 'root'
})
export class HeatService {

  constructor(private telegramService:TelegramService) { }

  GetSequenceHeats()
    {
      return this.telegramService.send
      ({
        telId:1001,
        telData:{}
      })
    }
}
