import { IAlertSimulate } from '@arc.module/models/interfaces/alert-simulate.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';


@Component({
  selector: 'alert-send-view',
  templateUrl: './alert-send-view.html',
  styleUrls: ['./alert-send-view.scss']
})
export class AlertSendView implements OnInit {

  @Input() alert: IAlert;
  @Output() result = new EventEmitter<IAlertSimulate>();

  simulateAlert: IAlertSimulate = {
    alertId: 0,
    prm1: "",
    prm2: "",
    prm3: ""
  };
  hasPrm1: boolean;
  hasPrm2: boolean;
  hasPrm3: boolean;

  constructor() { }

  ngOnInit(): void {
    this.simulateAlert.alertId = this.alert.alertId;
    if (this.alert.template.indexOf("@1") != -1)
      this.hasPrm1 = true;
    if (this.alert.template.indexOf("@2") != -1)
      this.hasPrm2 = true;
    if (this.alert.template.indexOf("@3") != -1)
      this.hasPrm3 = true;
  }

  onNoClick() {
    this.result.emit(null);
  }

  onOkClick() {
    this.result.emit(this.simulateAlert);
  }
}
