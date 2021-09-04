import { Component, OnInit, Inject } from '@angular/core';
import { UserPageService } from '../../../../../services/user-page.service'
import { MatSnackBar } from '@angular/material/snack-bar';

import { AlertDefinitionService } from '../../../../../services/alert.service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';

@Component({

  selector: 'alert-log-list-presenter',
  template: `
  <alert-log-list-view
  [alertLogs]="_alertLogs"
  >
  </alert-log-list-view>
  `,
})
export class AlertLogListPresenter implements OnInit {

  _alertLogs: IAlertLogItem[];

  constructor(
    private alertService: AlertDefinitionService,
    private userPageService: UserPageService,
    private snackBar: MatSnackBar,
    public bottomSheetRef: MatBottomSheetRef<AlertLogListPresenter>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: IAlertLogItem[]
  ) {
    if (data != null) {
      this._alertLogs = data;
    }
  }

  async ngOnInit() {

  }
}
