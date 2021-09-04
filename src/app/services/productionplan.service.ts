import { Injectable } from '@angular/core';
import { TelegramService } from '@arc.module/services/telegram.service';

@Injectable({
  providedIn: 'root'
})
export class ProductionplanService {

  constructor(private telegramService:TelegramService) {

  }
  getProductionplans()
    {
      return this.telegramService.send
      ({
        telId:1000,
        telData:{}
      })
    }


    deleteplan(
      HeatID:number
    ){
return this.telegramService.send({
  telId:1080,
  telData:{HeatID}
});
}
}
