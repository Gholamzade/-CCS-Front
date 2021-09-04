import { IFullTelegramLogItem } from '@arc.module/models/interfaces/full-telegram-log-item.interface';
import { ITelegramLogList } from '@arc.module/models/interfaces/telegram-log-list.interface';
import { ITelegramLogFilter } from '@arc.module/models/interfaces/telegram-log-filter.interface';
import { Component, OnInit } from '@angular/core';
import { TelegramLogPageService } from '../../../../../services/telegram-log.service';


import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MenuPageService } from '../../../../../services/menu-page.service';

import { TelegramDefinitionPageService } from '../../../../../services/telegram-definition-page.service';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';

@Component({
  selector: 'telegram-grid-presenter',
  template: `<telegram-grid-view
  (sendtelegramClick)="onsendtelegramClick($event)"
  (pagerFilter)="searchByPaginator($event)"
  (telegramLogSelected)="telegramLogSelected($event)"
  [telegramLogList]="telegramLogList"
  [selectedTelegramLogData]="selectedTelegramLogData"
  [allUnits]="allUnits"
  [telegrams]="telegrams"
  [loadingSimpleTelegramLogs]="loadingSimpleTelegramLogs$|async"
  ></telegram-grid-view>`

})
export class TelegramGridPresenter implements OnInit, OnDestroy {

  private destroy: Subject<void> = new Subject<void>()
  pageNumber: number
  filterData: ITelegramLogFilter
  telegramLogList: ITelegramLogList
  selectedTelegramLogData: IFullTelegramLogItem
  allUnits: IUnit[] = [];
  telegrams: ITelegram[] = [];
  constructor(
    private telegramDefinitionService: TelegramDefinitionPageService,
    private telegramLogService: TelegramLogPageService,
    private menuPageService: MenuPageService
  ) { }

  loadingSimpleTelegramLogs$ = this.telegramLogService.loadingSimpleTelegramLogs.asObservable()


  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  getLogList() {
    this.telegramLogService.searchResult.pipe(
      takeUntil(this.destroy)
    ).subscribe(data => {
      this.telegramLogList = data;
    })
  }

  async ngOnInit() {
    await this.searchByPaginator({
      direction: 1,
      pageSize: 8,
    } as ITelegramLogFilter)
    this.allUnits = await this.menuPageService.GetAllUnits2()
    this.telegrams = await this.telegramDefinitionService.GetTelegrams();
    this.getLogList()
  }

  searchByPaginator(event: ITelegramLogFilter) {
    this.telegramLogService.datafilter.next(event);
  }

  onsendtelegramClick(telegram: ITelegram) {
    // try {
    //   debugger;
    //   this.telegramservice.sendTelegram(telegram);
    // }
    // catch (e) {
    //   console.log('error occored on onsendtelegramClick');
    // };
  }

  async telegramLogSelected(telegramLogId: number) {
    this.selectedTelegramLogData = await this.telegramLogService.getFullTelegramLog(telegramLogId);
  }


}
