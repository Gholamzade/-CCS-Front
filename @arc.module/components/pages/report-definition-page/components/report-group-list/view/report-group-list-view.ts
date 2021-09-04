import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { MatDialog } from '@angular/material/dialog';
import { ReportGroupAddEditPresenter } from '../../report-group-add-edit/report-group-add-edit-presenter';
import { ConfirmModalView } from '../../../../../shared-components/Confirm/view/confirm-modal-view';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IReportGroup } from '@arc.module/models/interfaces/report-group.interface';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';

@Component({
  selector: 'report-group-list-view',
  templateUrl: './report-group-list-view.html',
  styleUrls: ['./report-group-list-view.scss']
})
export class ReportGroupListView implements OnInit {
  _reportGroups: IReportGroup[] = [];
  _tempReportGroupsBeforeReorder: IReportGroup[] = [];

  @Input() selectedUnit: IUnit;
  @Input() set reportGroups(value: IReportGroup[]) {
    this._reportGroups = value;
    this.reportGroupEditOrderMode = false;
  }
  @Output() reportGroupRefresh = new EventEmitter<any>();
  @Output() reportGroupRemoved = new EventEmitter<IReportGroup>();
  @Output() reportGroupReOrdered = new EventEmitter<number[]>();
  reportGroupEditOrderMode: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  AddReportGroup() {
    let tempPosition = 1;
    this._reportGroups.forEach(element => {
      if (element.position > tempPosition)
        tempPosition = element.position
    });
    let newMenu: IReportGroup = {
      reportGroupId: 0,
      unitFk: this.selectedUnit.unitId,
      position: tempPosition + 1,
      title: "",
      serverAddress: ""
    }
    const dialogRef = this.dialog.open(ReportGroupAddEditPresenter, {
      width: '250px',
      data: newMenu
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) // added successfully
      {
        this.reportGroupRefresh.emit(true);
      }
    });
  }

  EditReportGroup(reportGroup: IReportGroup) {
    let reportGroupToEdit: IReportGroup = { ...reportGroup };
    const dialogRef = this.dialog.open(ReportGroupAddEditPresenter, {
      width: '250px',
      data: reportGroupToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // edited successfully
        this.reportGroupRefresh.emit(true);
      }
    });

  }

  RemoveReportGroup(reportGroup: IReportGroup) {

    const dialogRef = this.dialog.open(ConfirmModalView, {
      data: `Are you sure you want to remove the ${reportGroup.title} ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {// user pressed ok
        this.reportGroupRemoved.emit(reportGroup);
      }
    });

  }

  SaveReportGroupOrder() {
    let positions: number[] = [];
    this._reportGroups.forEach(element => {
      positions.push(element.reportGroupId);
    });
    this.reportGroupReOrdered.emit(positions);
  }

  toggleReportGroup() {
    if (!this.reportGroupEditOrderMode) {
      this._tempReportGroupsBeforeReorder = [];
      Object.assign(this._tempReportGroupsBeforeReorder, this._reportGroups);
    }
    this.reportGroupEditOrderMode = !this.reportGroupEditOrderMode;
  }

  resetReportGroupOrder() {
    Object.assign(this._reportGroups, this._tempReportGroupsBeforeReorder);
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
