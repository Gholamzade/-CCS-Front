import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ReportPageService } from '../../../../../services/report-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IReport } from '@arc.module/models/interfaces/report.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';

@Component({

  selector: 'report-add-edit-presenter',
  template: `
  <report-add-edit-view
  [report]="_report"
    [selectedGroupsId]="_selectedGroupsId"
    (result)="submitReport($event)"
  >
  </report-add-edit-view>
  `,
})
export class ReportAddEditPresenter implements OnInit {
  _report: IReport;
  _selectedGroupsId: number[] = [];

  constructor(private reportPageService: ReportPageService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ReportAddEditPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: IReport) {
    if (data != null) {
      this._report = data;
      this._report.connectUgReport.forEach(element => {
        this._selectedGroupsId.push(element.userGroupFk)
      });
    }
  }

  ngOnInit() {
  }

  async submitReport(report: IReport) {
    if (report) {
      let res: IServerResponse = await this.reportPageService.ModifyReport(report);
      this.snackBar.open(res.message, '', { duration: 2000 });
      if (res.telId === 200) {
        this.dialogRef.close(report);
      }
    }
  }


}
