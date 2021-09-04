import { Pipe, PipeTransform } from '@angular/core';
import { DateUtility } from '@arc.module/utilities/date-utility';

@Pipe({
  name: 'jalaliDateToMiladi'
})
export class JalaliDateToMiladiPipe implements PipeTransform {

  constructor() {

  }
  transform(value: string, type?: 'date' | 'time'): string {

    let dateTime = DateUtility.dateToIrisaDate(new Date(value)).toMiladi().toString();
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


