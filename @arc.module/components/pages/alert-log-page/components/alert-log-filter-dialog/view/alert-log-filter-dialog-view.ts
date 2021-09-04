import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';


@Component({
  selector: 'alert-log-filter-dialog-view',
  templateUrl: './alert-log-filter-dialog-view.html',
  styleUrls: ['./alert-log-filter-dialog-view.scss'],
})

export class AlertLogFilterDialogView implements OnInit {

  @Input('alert-log-item') alertLogItem: IAlertLogItem
  @Output('close-event') closeEvent: EventEmitter<void> = new EventEmitter<void>()
  constructor() { }

  ngOnInit() { }
}
