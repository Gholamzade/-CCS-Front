import { ITelegramSearchResult } from '@arc.module/models/interfaces/telegram-search-result.interface';
import { Injectable } from '@angular/core';


import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TelegramDefinitionPageService } from './telegram-definition-page.service'
import { ArcTelegramService } from './arcTelegram.service';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';
import { ITelegramLogFilter } from '@arc.module/models/interfaces/telegram-log-filter.interface';
import { ITelegramLogList } from '@arc.module/models/interfaces/telegram-log-list.interface';
import { IFullTelegramLogItem } from '@arc.module/models/interfaces/full-telegram-log-item.interface';
import { ITelegramSimulate } from '@arc.module/models/interfaces/telegram-simulate.interface';
import { Telegram } from '@arc.module/models/classes/telegram.class';


@Injectable({
  providedIn: 'root'
})

export class TelegramLogPageService {
  telegramfilter: ITelegramLogFilter;
  datafilter: BehaviorSubject<ITelegramLogFilter> = new BehaviorSubject<ITelegramLogFilter>(null);
  telegramData: BehaviorSubject<ITelegram[]> = new BehaviorSubject(null);
  searchResult: BehaviorSubject<ITelegramLogList> = new BehaviorSubject<ITelegramLogList>(null)

  latestFilterData: ITelegramLogFilter;
  currentPageIndex: number;
  loadingSimpleTelegramLogs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  constructor(private telService: ArcTelegramService, private telegramDefinitionPageService: TelegramDefinitionPageService) {

    this.datafilter.subscribe(filters => {
      console.warn("filters", filters)
      if (filters !== null && filters !== undefined) {
        if (filters.lastLogId) {                                    //called by paginator
          this.latestFilterData.direction = filters.direction;
          this.latestFilterData.lastLogId = filters.lastLogId;
        }
        else {                                                      //called by manual search or auto refresh
          this.latestFilterData = { ...filters };
          this.latestFilterData.pageSize = 20;
          this.currentPageIndex = 0;
          this.latestFilterData.lastLogId = 0;
        }

        this.getSimpleTelegramLogs().then((res: ITelegramLogList) => {

          this.searchResult.next(res)
        })
      }
    });

  }


  async getSimpleTelegramLogs() {
    let newTelegramLogList: ITelegramLogList
      = {
      pageIndex: 0,
      pageSize: this.latestFilterData.pageSize,
      telegramLogItems: [],
      total: 0
    }

    const obj = new Telegram(28, this.latestFilterData);
    this.loadingSimpleTelegramLogs.next(true);
    return this.telService.send(obj).then(res => {
      let searchResult: ITelegramSearchResult = res.telData.body;
      // searchResult.list.forEach(element => {
      //   newTelegramLogList.telegramLogItems.push(element);
      // });
      newTelegramLogList.telegramLogItems = searchResult.list
      newTelegramLogList.total = searchResult.totalCount;
      if (this.latestFilterData.lastLogId) {
        this.currentPageIndex += this.latestFilterData.direction;
        newTelegramLogList.pageIndex = this.currentPageIndex;
      }
      else {
        this.currentPageIndex = 0;
        newTelegramLogList.pageIndex = 0;
      }
      return newTelegramLogList;
    }).finally(() => {
      this.loadingSimpleTelegramLogs.next(false);
    });

  }

  async getFullTelegramLog(telegramLogId: number) {
    const obj = new Telegram(29, { telegramLogId: telegramLogId });
    return this.telService.send(obj).then(res => {
      return res.telData.body as IFullTelegramLogItem
    });
  }

  async sendSimulatedTelegram(simulateModel: ITelegramSimulate) {
    const obj = new Telegram(53, simulateModel);
    return this.telService.send(obj).then(res => {
      let res2: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return res2;
    });
  }

  getLastHour(): number[] {
    let lasthours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return lasthours;
  }



  getDisplayColumn() {

    //, 'Sender', 'reciver', 'body'
    return ['id', 'name', 'senderUnit', 'reciverUnit', 'date'];
  }




}
