import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';


@Component({
  selector: 'popup-alert-view',
  templateUrl: 'popup-alert-view.html',
  styleUrls: ['popup-alert-view.scss']
})
export class PopupAlertView {

  @Input() alertLog: IAlertLogItem;
  @Output() result = new EventEmitter<IAlertLogItem>();

  constructor() {
  }

  onOkClick() {
    this.result.emit(this.alertLog);
  }

}
