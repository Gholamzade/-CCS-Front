import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { AlertLogService } from '../../../../../services/alert-log.service';

import { IAlertLogFilter } from '@arc.module/models/interfaces/alert-log-filter.interface';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';


@Component({

  selector: 'alert-log-filter-presenter',
  template: `
  <alert-log-filter-view
    [alertList]="alertList"
    [alertTypeList]="alertTypeList"
    [datePeriods]="datePeriods"
    (onSearchData)="searchByManualFilters($event)"
  >
  </alert-log-filter-view>
  `,
})
export class AlertLogFilterPresenter implements OnInit {
  alertList: IAlert[];
  alertTypeList: any[]
  datePeriods: any

  constructor(private alertLogService: AlertLogService) {
    this.readAlerts()
  }

  ngOnInit() {
    this.readAlertTypeList()
    this.readDatePeriods()
  }

  searchByManualFilters(event: IAlertLogFilter) {
    event.pageNumber = 0;
    event.pageSize = 0;
    this.alertLogService.searchFilters.next(event);
  }

  async readAlerts() {
    this.alertList = await this.alertLogService.readAlerts();
  }

  async readAlertTypeList() {
    this.alertTypeList = await this.alertLogService.readAlertTypeList();
  }

  async readDatePeriods() {
    this.datePeriods = await this.alertLogService.readDatePeriods();
  }

}
