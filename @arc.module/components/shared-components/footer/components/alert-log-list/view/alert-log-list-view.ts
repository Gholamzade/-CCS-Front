import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from '@arc.module/enums/alert-type';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';


@Component({
  selector: 'alert-log-list-view',
  templateUrl: './alert-log-list-view.html',
  styleUrls: ['./alert-log-list-view.scss']
})
export class AlertLogListView implements OnInit {

  get alertType() {
    return AlertType;
  }
  private _alertLogs: IAlertLogItem[]
  @Input() set alertLogs(val: IAlertLogItem[]) {
    this._alertLogs = [] as IAlertLogItem[]
    this._alertLogs = val
  };

  get alertLogs(): IAlertLogItem[] {
    return this._alertLogs;
  }

  constructor() { }

  ngOnInit(): void {

  }

}
