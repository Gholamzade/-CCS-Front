import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ReportPageService } from '../../../../../services/report-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IReportGroup } from '@arc.module/models/interfaces/report-group.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';

@Component({

  selector: 'report-group-add-edit-presenter',
  template: `
  <report-group-add-edit-view
  [reportGroup]="_reportGroup"
    (result)="submitReportGroup($event)"
  >
  </report-group-add-edit-view>
  `,
})
export class ReportGroupAddEditPresenter implements OnInit {

  _reportGroup: IReportGroup;
  constructor(private reportPageService: ReportPageService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ReportGroupAddEditPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: IReportGroup) {
    if (data != null) {
      this._reportGroup = data;
    }
  }

  ngOnInit() {
  }

  async submitReportGroup(reportGroup: IReportGroup) {
    if (reportGroup) {
      let res: IServerResponse = await this.reportPageService.ModifyReportGroup(reportGroup);
      this.snackBar.open(res.message, '', { duration: 2000 });
      if (res.telId === 200) {
        this.dialogRef.close(reportGroup);
      }
    }
  }


}
