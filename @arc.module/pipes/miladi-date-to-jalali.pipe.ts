import { Pipe, PipeTransform } from '@angular/core';
import { DateUtility } from '@arc.module/utilities/date-utility';

@Pipe({
  name: 'miladiDateToJalali'
})
export class MiladiDateToJalaliPipe implements PipeTransform {

  constructor() {

  }
  transform(value: string, type?: 'date' | 'time'): string {
    let dateTime = DateUtility.dateToIrisaDate(new Date(value)).toJalali().toString();
    let dateArray = dateTime.split(' ');
    let result: string = null;
    if (type === 'date') {
      result = dateArray[0]
    } else if (type === 'time') {
      result = dateArray[1]
    } else {
      result = dateTime;

    }

    return result
  }


}


