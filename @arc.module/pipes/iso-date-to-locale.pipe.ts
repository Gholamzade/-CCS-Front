import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoDateToLocale'
})
export class IsoDateToLocalePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return new Date(value).toLocaleString('fa-IR');
  }

}
