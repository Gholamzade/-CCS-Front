import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertType } from '@arc.module/enums/alert-type';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';
import { LanguageService } from '@arc.module/services/language.service';

@Component({
  selector: 'alert-list-dialog-view',
  templateUrl: 'alert-list-dialog-view.html',
  styleUrls: ['./alert-list-dialog-view.scss']
})
export class AlertListDialogView {

  alertLogs: IAlertLogItem[] = [];
  dir: string;
  selectedLanguage: string;
  get alertType() {
    return AlertType;
  }

  constructor(
    public dialogRef: MatDialogRef<IAlertLogItem[]>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private languageService: LanguageService,

  ) {
    this.alertLogs = data;
    this.dir = languageService.getDirection();
    this.selectedLanguage = languageService.selectedLanguage;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  close(): void {

    this.dialogRef.close();

  }

}
