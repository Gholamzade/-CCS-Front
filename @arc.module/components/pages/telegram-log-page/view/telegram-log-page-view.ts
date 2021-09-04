import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TelegramFilterPresenter } from '../components/telegram-filter/telegram-filter-presenter';

@Component({
  selector: 'telegram-log-page-view',
  templateUrl: './telegram-log-page-view.html',
  styleUrls: ['./telegram-log-page-view.scss']
})
export class TelegramLogPageView implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  showFilters() {
    this._bottomSheet.open(TelegramFilterPresenter);
  }
}
