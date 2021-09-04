import { ITelegramSimulate } from '@arc.module/models/interfaces/telegram-simulate.interface';
import { Component, OnInit, Input, Inject, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { TelegramLogPageService } from '../../../../../services/telegram-log.service';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';
import { IFullTelegramLogItem } from '@arc.module/models/interfaces/full-telegram-log-item.interface';


@Component({
  selector: 'edit-response-data-presenter',
  template: `<edit-response-data-view
  [selectedLog]='selectedLog'
  [units]='units'
  (sendSimulatedTelegram)='sendSimulatedTelegram($event)'
  ></edit-response-data-view>`,
  styleUrls: []
})
export class EditResponseDataPresenter implements OnInit {

  selectedTelegramLog: IFullTelegramLogItem;
  units: IUnit[];
  selectedLog: IFullTelegramLogItem;

  constructor(private telegramLogService: TelegramLogPageService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditResponseDataPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.units = data.units;
      this.selectedLog = data.selectedLog;
    }
  }

  ngOnInit(): void {
  }

  async sendSimulatedTelegram(simulatedTelegram: ITelegramSimulate) {
    let res: IServerResponse = await this.telegramLogService.sendSimulatedTelegram(simulatedTelegram);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.dialogRef.close();
    }
  }


}
