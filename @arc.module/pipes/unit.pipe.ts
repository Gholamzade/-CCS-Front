import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { IUnit } from '../models/interfaces/unit.interface';

@Pipe({
  name: "unitParse"
})
export class UnitParse implements PipeTransform {

  constructor() {

  }
  transform(unitId: number, allUnits: IUnit[], key: string): any {
    let unit = allUnits.find(x => x.unitId === unitId);
    if (unit == undefined || unit === null) {
      return '';
    }
    return unit[key]
  }
}
