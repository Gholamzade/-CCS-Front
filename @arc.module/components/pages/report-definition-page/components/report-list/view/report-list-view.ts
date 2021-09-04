import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReportAddEditPresenter } from '../../report-add-edit/report-add-edit-presenter';
import { ConfirmModalView } from '../../../../../shared-components/Confirm/view/confirm-modal-view';
import { IReport } from '@arc.module/models/interfaces/report.interface';
import { IReportGroup } from '@arc.module/models/interfaces/report-group.interface';

@Component({
  selector: 'report-list-view',
  templateUrl: './report-list-view.html',
  styleUrls: ['./report-list-view.scss']
})
export class ReportListView implements OnInit {

  @Output() reportReOrdered = new EventEmitter<number[]>();
  @Output() reportRefresh = new EventEmitter<any>();
  @Output() reportRemoved = new EventEmitter<IReport>();
  _reports: IReport[] = []
  _tempReportsBeforeReorder: IReport[] = [];
  @Input() set reports(value: IReport[]) {
    this._reports = value;
  }
  @Input() selectedReportGroup: IReportGroup;

  reportEditOrderMode = false;


  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
  }



  AddReport() {
    let tempPosition = 1;
    this._reports.forEach(element => {
      if (element.position > tempPosition)
        tempPosition = element.position
    });
    let newReport: IReport = {
      reportId: 0,
      position: tempPosition + 1,
      title: "",
      reportGroupFk: this.selectedReportGroup.reportGroupId,
      revision: "",
      connectUgReport: [],
      name: "",
    }
    const dialogRef = this.dialog.open(ReportAddEditPresenter, {
      width: '250px',
      data: newReport
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) // added successfully
      {
        this.reportRefresh.emit(true);
      }
    });
  }

  RemoveReport(report: IReport) {
    const dialogRef = this.dialog.open(ConfirmModalView, {
      data: `Are you sure you want to remove the ${report.title} ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {// user pressed ok
        this.reportRemoved.emit(report);
      }
    });
  }

  EditReport(report: IReport) {
    let reportToEdit: IReport = { ...report };
    const dialogRef = this.dialog.open(ReportAddEditPresenter, {
      width: '250px',
      data: reportToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // user pressed ok
        this.reportRefresh.emit(true);
      }
    });

  }

  SaveReportOrder() {
    let positions: number[] = [];
    this._reports.forEach(element => {
      positions.push(element.reportId);
    });
    this.reportReOrdered.emit(positions);
  }

  toggleReport() {
    if (!this.reportEditOrderMode) {
      this._tempReportsBeforeReorder = [];
      Object.assign(this._tempReportsBeforeReorder, this._reports);
    }
    this.reportEditOrderMode = !this.reportEditOrderMode;
  }

  resetReportOrder() {
    Object.assign(this._reports, this._tempReportsBeforeReorder);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
