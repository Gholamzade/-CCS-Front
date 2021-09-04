import { Injectable } from '@angular/core';
import { Telegram } from '../models/classes/telegram.class';


import { ArcTelegramService } from './arcTelegram.service';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private telService: ArcTelegramService) { }

  async log(id:string, text: string) {
    let tel = new Telegram(52, {text,id});
    await this.telService.send(tel);
  }
}
