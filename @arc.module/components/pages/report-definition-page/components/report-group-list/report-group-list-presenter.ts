import { IReportGroup } from '@arc.module/models/interfaces/report-group.interface';
import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, Inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ReportPageService } from '../../../../../services/report-page.service'
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';


@Component({

  selector: 'report-group-list-presenter',
  template: `
  <report-group-list-view
  [selectedUnit]="_selectedUnit"
  [reportGroups]="reportGroups"
  (reportGroupRefresh)="RefreshReportGroup()"
  (reportGroupRemoved)="ReportGroupRemoved($event)"
  (reportGroupReOrdered)="ReportGroupReOrdered($event)"
  >
  </report-group-list-view>
  `,
})
export class ReportGroupListPresenter implements OnInit {
  _selectedUnit: IUnit;
  reportGroups: IReportGroup[] = [];
  @Input() set selectedUnit(value: IUnit) {
    if (value) {
      this._selectedUnit = value;
      this.RefreshReportGroup();
    }
  }

  constructor(private reportPageService: ReportPageService, private snackBar: MatSnackBar) {

  }
  ngOnInit() {
  }

  async RefreshReportGroup() {
    this.reportGroups = [];
    this.reportPageService.GetAllReportGroups(this._selectedUnit).then(res => this.reportGroups = res);
  }

  async ReportGroupRemoved(reportGroup: IReportGroup) {
    let reportGroupToDelete: IReportGroup = { ...reportGroup }
    reportGroupToDelete.reportGroupId *= -1;
    var res: IServerResponse = await this.reportPageService.ModifyReportGroup(reportGroupToDelete);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshReportGroup();
    }
  }

  async ReportGroupReOrdered(reportGroupOrder: number[]) {
    var res: IServerResponse = await this.reportPageService.ReportGroupReOrdered(reportGroupOrder);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshReportGroup();
    }
  }

}
