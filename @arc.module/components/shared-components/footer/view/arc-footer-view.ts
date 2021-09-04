import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DateUtility, IrisaDate } from '../../../../utilities/date-utility'

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AlertLogListPresenter } from './../components/alert-log-list/alert-log-list-presenter';
import { AlertListDialogView } from '@arc.module/components/shared-components/alert-list-dialog/view/alert-list-dialog-view';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';
import { AlertColorCode } from "@arc.module/enums/color-code";
import { DatePipe } from '@angular/common';
import { AlertType } from '@arc.module/enums/alert-type';
import { LanguageService } from '@arc.module/services/language.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'arc-footer-view',
  templateUrl: './arc-footer-view.html',
  styleUrls: ['./arc-footer-view.scss']
})
export class ArcFooterView implements OnInit, OnDestroy {
  dir: string
  timer;
  dateType = "JALALI";
  dateTime = "";
  dateTimeTooltip = "";
  @Input() lastLog: IAlertLogItem
  @Input() alertCount: number
  lastLogColor: string
  lastLogIcon: string
  lastLogTime: string
  cssClass: string

  footerLogs: IAlertLogItem[] = [];
  selectedLanguage: string;
  @Input() set newLog(value: IAlertLogItem) {
    if (value) {
      // console.log(value);

      this.footerLogs.push(value);
      if (this.footerLogs.length > this.alertCount) {
        this.footerLogs.splice(0, 1);
      }

      this.lastLog = this.footerLogs[this.footerLogs.length - 1]
      switch (this.lastLog.type) {
        case AlertType.INFO:
          this.lastLogColor = AlertColorCode.info;
          this.lastLogIcon = "info";
          this.cssClass = "alert alert-info";
          break;
        case AlertType.WARNING:
          this.lastLogColor = AlertColorCode.warning;
          this.lastLogIcon = "error_outline";
          this.cssClass = "alert alert-warning";
          break;
        case AlertType.SUCCESS:
          this.lastLogColor = AlertColorCode.success;
          this.lastLogIcon = "check_circle_outline";
          this.cssClass = "alert alert-success";
          break;
      }
      // this.lastLogTime = new Date(this.lastLog.alertLogDate).toLocaleString('fa-IR');
    }
  }

  constructor(
    private _bottomSheet: MatBottomSheet,
    private languageService: LanguageService,
    public dialog: MatDialog
  ) {
    this.dir = languageService.getDirection();
    this.selectedLanguage = languageService.selectedLanguage;
  }


  date: string
  time: string
  dayOfWeek: string

  ngOnInit(): void {
    this.timer = setInterval(() => {
      const faDate = new IrisaDate('fa');
      const enDate = new IrisaDate('en');
      let faDateAndTime = faDate.toString(true).split(' ');
      let enDateAndTime = enDate.toString(true).split(' ');

      if (this.dateType == "JALALI") {

        // this.dateTime = `${faDateAndTime[0]} ${faDate.dayOfWeek()} | ${faDateAndTime[1]} ساعت`;
        this.date = faDateAndTime[0];
        this.dayOfWeek = faDate.dayOfWeek();
        this.time = faDateAndTime[1];

        // this.dateTimeTooltip = `${enDateAndTime[0]} ${faDate.dayOfWeek()} | ${enDateAndTime[1]} Time`;
      } else {
        this.date = enDateAndTime[0];
        this.dayOfWeek = enDate.dayOfWeek();
        this.time = enDateAndTime[1];

        // this.dateTime = `${enDateAndTime[0]} ${faDate.dayOfWeek()} | ${enDateAndTime[1]} Time`;
        // this.dateTimeTooltip = `${faDateAndTime[0]} ${faDate.dayOfWeek()} | ${faDateAndTime[1]} ساعت`;
      }
    }, 1000);

  }

  changeDateType() {
    if (this.dateType == "JALALI") {
      this.dateType = "MILADI";
    }
    else this.dateType = "JALALI";
  }

  clickLog() {
    this._bottomSheet.open(AlertLogListPresenter, {
      data: this.footerLogs
    });
  }

  showMore() {
    const dialogRef = this.dialog.open(AlertListDialogView, {
      minWidth: '42.875rem',
      data: this.footerLogs
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
