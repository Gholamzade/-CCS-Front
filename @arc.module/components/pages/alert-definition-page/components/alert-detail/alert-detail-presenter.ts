import { Component, OnInit, Inject } from '@angular/core';

import { AlertDefinitionService } from '../../../../../services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';

@Component({
  selector: 'alert-detail-presenter',
  template: `<alert-detail-view
      [alert]="alert">
    </alert-detail-view>`
})

export class AlertDetailPresenter implements OnInit {

  alert: IAlert;

  constructor(private alertDefinitionService: AlertDefinitionService,
    public dialogRef: MatDialogRef<AlertDetailPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: IAlert) {
    if (data) {
      this.alert = this.data;
    }
  }

  ngOnInit() {

  }

}
