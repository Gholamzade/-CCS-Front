import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';


import { TelegramLogPageService } from '../../../../../services/telegram-log.service'
import { MenuPageService } from '../../../../../services/menu-page.service'
import { TelegramDefinitionPageService } from '../../../../../services/telegram-definition-page.service'
import { IUnit } from '@arc.module/models/interfaces/unit.interface';
import { ITelegramLogFilter } from '@arc.module/models/interfaces/telegram-log-filter.interface';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';
import { Subject } from 'rxjs';


@Component({
  selector: 'telegram-filter-presenter',
  template: `<telegram-filter-view
  (filterClick)="onFilterClick($event)"
  [lastHours]="lastHours"
  [telegrams]="telegrams$ | async"
  [units]="units"
  ></telegram-filter-view>`,

})
export class TelegramFilterPresenter implements OnInit {

  telegrams: ITelegram[];
  telegrams$: Subject<ITelegram[]> = new Subject();
  units: IUnit[];
  lastHours: number[];
  telegramfilter: ITelegramLogFilter;
  constructor(
    private telegramservice: TelegramLogPageService,
    private menuPageService: MenuPageService,
    private telegramDefinitionService: TelegramDefinitionPageService,
    private _bottomSheetRef: MatBottomSheetRef<TelegramFilterPresenter>
  ) { }

 
  onFilterClick(telegramfilter: ITelegramLogFilter) {
    this.telegramservice.datafilter.next(telegramfilter);
    console.warn(this._bottomSheetRef)
    if (this._bottomSheetRef?.instance) {
      this._bottomSheetRef?.dismiss();

    }
  }

  async ngOnInit() {
    this.units = await this.menuPageService.GetAllUnits2();
    this.telegrams = await this.telegramDefinitionService.GetTelegrams();
    this.telegrams$.next(this.telegrams)
    this.lastHours = this.telegramservice.getLastHour();
  }

}
