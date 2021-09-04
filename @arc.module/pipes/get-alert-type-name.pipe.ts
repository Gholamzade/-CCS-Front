
import { Pipe, PipeTransform } from '@angular/core';
import { IAlertType } from '@arc.module/models/interfaces/alert-type.interface';
import { AlertLogService } from '../services/alert-log.service'

@Pipe({

  name: 'getAlertTypeName'

})

export class GetAlertTypeNamePipe implements PipeTransform {

  alertTypes: IAlertType[] = [];
  constructor(private alertLogService: AlertLogService) {
    this.alertTypes = alertLogService.alertTypeList
  }
  public transform(alertTypeId: number): string {

    return this.alertTypes.find(x => x.value === alertTypeId).name;

  }
}
