import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';

@Component({
  selector: 'telegram-body-presenter',
  template: `<telegram-body-view
      [telegram]="telegram" >
      </telegram-body-view>`
})

export class TelegramBodyPresenter implements OnInit {

  telegram: ITelegram;

  constructor(public dialogRef: MatDialogRef<TelegramBodyPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: ITelegram) {
    if (data) {
      this.telegram = data as ITelegram;
    }
  }

  async ngOnInit() {

  }



}
