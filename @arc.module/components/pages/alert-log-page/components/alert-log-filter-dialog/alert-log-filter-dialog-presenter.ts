import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';

@Component({
  selector: 'alert-log-filter-dialog-presenter',
  template: `
    <alert-log-filter-dialog-view
    [alert-log-item]="alertLogItem"
    (close-event)="close()"
    >
    </alert-log-filter-dialog-view>
    `
})

export class AlertLogFilterDialogPresenter implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AlertLogFilterDialogPresenter>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  alertLogItem: IAlertLogItem = this.data.alertLogItem


  onNoClick(): void {
    this.dialogRef.close(1);
  }

  close() {
    this.onNoClick()
  }

  ngOnInit() { }
}
