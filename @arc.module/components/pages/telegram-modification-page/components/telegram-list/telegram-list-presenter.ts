import { Component, OnInit, AfterViewInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';

import { TelegramDefinitionPageService } from '../../../../../services/telegram-definition-page.service'

@Component({
  selector: 'telegram-list-presenter',
  template: `<telegram-list-view
      [telegrams]="telegrams"
      (telegramsRefresh)="RefreshTelegrams()"
      >
    </telegram-list-view>`
})

export class TelegramListPresenter implements OnInit {

  telegrams: ITelegram[] = [];
  constructor(
    private telegramDefinitionPageService: TelegramDefinitionPageService,
    private snackBar: MatSnackBar) {

  }

  async ngOnInit() {
    this.RefreshTelegrams();
  }

  async RefreshTelegrams() {
    this.telegrams = [];
    this.telegrams = await this.telegramDefinitionPageService.GetTelegrams();
  }

}
