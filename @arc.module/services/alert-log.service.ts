import { IAlertLogList } from '@arc.module/models/interfaces/alert-log-list.interface';


import { IAlertLogFilter } from '@arc.module/models/interfaces/alert-log-filter.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ArcTelegramService } from './arcTelegram.service';

import { IAlertType } from '@arc.module/models/interfaces/alert-type.interface';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';
import { Telegram } from '@arc.module/models/classes/telegram.class';

@Injectable({
  providedIn: 'root'
})
export class AlertLogService {


  alertTypeList: IAlertType[] = [
    { name: "INFO", value: 1 },
    { name: "WARNING", value: 2 },
    { name: "DANGER", value: 3 },
    { name: "SUCCESS", value: 4 }
  ];

  datePeriod = [
    { name: "", value: 0 },

    { name: "Last Hour", value: 1 },
    { name: "Last 12 Hours", value: 2 },
    { name: "Last Day", value: 3 }
  ];

  defaultPageSize = 20;
  latestFilterData: IAlertLogFilter = {} as IAlertLogFilter;
  searchFilters: BehaviorSubject<IAlertLogFilter> = new BehaviorSubject<IAlertLogFilter>(null)
  // searchFiltersObs$: Observable<IAlertLogFilter> = this.searchFilters.asObservable();
  searchResult: BehaviorSubject<IAlertLogList> = new BehaviorSubject<IAlertLogList>(null)


  constructor(private telService: ArcTelegramService) {
    this.searchFilters.subscribe(filters => {
      //
      if (filters !== null && filters !== undefined) {
        if (filters.pageNumber && filters.pageSize) {               //called by paginator
          this.latestFilterData.pageNumber = filters.pageNumber + 1;
          this.latestFilterData.pageSize = filters.pageSize;
        }
        else {                                                      //called by manual search
          this.latestFilterData = { ...filters };
          this.latestFilterData.pageSize = this.defaultPageSize;
          this.latestFilterData.pageNumber = 1;
        }
        this.getAlertLogList(this.latestFilterData).then((res: IAlertLogList) => {
          this.searchResult.next(res)
        })
      }
    })
  }

  async readAlerts() {
    let alerts: IAlert[] = []
    const obj = new Telegram(12, "");
    return this.telService.send(obj).then(res => {
      res.telData.body?.forEach(element => {
        alerts.push(element);
      });
      return alerts;
    });
  }

  async readDatePeriods() {
    return await this.datePeriod
  }

  async readAlertTypeList() {
    return await this.alertTypeList
  }

  async getAlertLogList(filters: IAlertLogFilter) {
    let newAlertLogList: IAlertLogList = {
      pageNumber: this.latestFilterData.pageNumber,
      pageSize: this.latestFilterData.pageSize,
      alertLogItems: [],
      // total: 20
    }

    const obj = new Telegram(26, filters);
    return this.telService.send(obj).then(res => {
      newAlertLogList.total = res.telData.body.totalCount;
      res.telData.body?.list?.forEach(element => {
        newAlertLogList.alertLogItems.push(element);
      });
      return newAlertLogList;
    });
  }
}
