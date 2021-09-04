import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IConnectUgReport } from '@arc.module/models/interfaces/connect-ug-report.interface';
import { IReport } from '@arc.module/models/interfaces/report.interface';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';




@Component({
  selector: 'report-add-edit-view',
  templateUrl: './report-add-edit-view.html',
  styleUrls: ['./report-add-edit-view.scss']
})
export class ReportAddEditView implements OnInit {

  @Input() report: IReport;
  @Input() selectedGroupsId: number[] = [];
  @Output() result = new EventEmitter<IReport>();

  constructor() {
  }


  ngOnInit(): void {
  }


  onOkClick(): void {
    this.result.emit(this.report);
  }

  onSelectedGroupsChange(groups: IUserGroup[]) {
    this.report.connectUgReport = [];
    groups.forEach(element => {
      const connectUgReport: IConnectUgReport = {
        connectUserGroupReportId: 0,
        reportFk: this.report.reportId,
        userGroupFk: element.userGroupId
      }
      this.report.connectUgReport.push(connectUgReport);
    });
  }

}
