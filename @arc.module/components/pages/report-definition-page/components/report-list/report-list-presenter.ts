import { Component, OnInit, Input } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportPageService } from '../../../../../services/report-page.service';

import { IReport } from '@arc.module/models/interfaces/report.interface';
import { IReportGroup } from '@arc.module/models/interfaces/report-group.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';

@Component({

  selector: 'report-list-presenter',
  template: `
  <report-list-view
  [reports]="reports"
    [selectedReportGroup]="_selectedReportGroup"
    (reportReOrdered)="ReportReOrdered($event)"
    (reportRefresh)="RefreshReport()"
    (reportRemoved)="ReportRemoved($event)"
  >
  </report-list-view>
  `,
})
export class ReportListPresenter implements OnInit {
  _selectedReportGroup: IReportGroup;
  reports: IReport[] = [];
  @Input() set reportGroup(value: IReportGroup) {
    this._selectedReportGroup = value;
    this.RefreshReport();
  }

  constructor(private reportPageService: ReportPageService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }

  async RefreshReport() {
    this.reports = [];
    this.reportPageService.GetReports(this._selectedReportGroup).then(res => this.reports = res);
  }

  async ReportRemoved(report: IReport) {
    let reportToDelete: IReport = { ...report }
    reportToDelete.reportId *= -1;
    var res: IServerResponse = await this.reportPageService.ModifyReport(reportToDelete);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshReport();
    }
  }

  async ReportReOrdered(reportOrder: number[]) {
    var res: IServerResponse = await this.reportPageService.ReportReOrdered(reportOrder);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshReport();
    }
  }


}
