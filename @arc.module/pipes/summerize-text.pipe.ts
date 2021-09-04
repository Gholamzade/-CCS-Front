import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summerizeText'
})
export class SummerizeTextPipe implements PipeTransform {

  constructor() {

  }
  transform(value: string, charCount: number = 150): string {
    return value?.length > charCount ? value.slice(0, charCount) + ' ...' : value;
  }


}


