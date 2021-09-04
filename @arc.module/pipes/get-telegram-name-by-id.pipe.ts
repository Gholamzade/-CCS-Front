import { Pipe, PipeTransform } from '@angular/core';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';


@Pipe({
  name: 'getTelegramNameById'
})
export class GetTelegramNameByIdPipe implements PipeTransform {

  transform(value: number, telList: ITelegram[]): string {
    return telList.find(x => x.telegramId == value)?.name;
  }
}
