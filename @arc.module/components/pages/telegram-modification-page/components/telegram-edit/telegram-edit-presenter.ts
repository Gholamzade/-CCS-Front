import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TelegramDefinitionPageService } from '../../../../../services/telegram-definition-page.service'

import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';

@Component({
  selector: 'telegram-edit-presenter',
  template: `<telegram-edit-view
      [telegram]="telegram"
      [selectedGroupsId]="selectedGroupsId"
      (result)="submitTelegram($event)" >
      </telegram-edit-view>`
})

export class TelegramEditPresenter implements OnInit {

  telegram: ITelegram;
  selectedGroupsId: number[] = [];


  userGroups: IUserGroup[];
  constructor(private snackBar: MatSnackBar,
    private telegramDefinitionPageService: TelegramDefinitionPageService,
    public dialogRef: MatDialogRef<TelegramEditPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: ITelegram) {
    if (data) {
      this.telegram = data as ITelegram;
      this.telegram.restrictedUgTelegram.forEach(element => {
        this.selectedGroupsId.push(element.userGroupFk)
      });
    }
  }

  async ngOnInit() {

  }

  async submitTelegram(telegram: ITelegram) {
    let res: IServerResponse = await this.telegramDefinitionPageService.ModifyTelegram(telegram);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.dialogRef.close(telegram);
    }
  }

}
