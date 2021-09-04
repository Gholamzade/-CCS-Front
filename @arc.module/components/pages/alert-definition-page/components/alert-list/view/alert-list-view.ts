import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';

import { AlertAddEditPresenter } from '../../../components/alert-add-edit/alert-add-edit-presenter';
import { AlertDetailPresenter } from '../../../components/alert-detail/alert-detail-presenter';
import { ConfirmModalView } from '../../../../../shared-components/Confirm/view/confirm-modal-view';
import { AlertSendPresenter } from '../../alert-send/alert-send-presenter';
import { IAlertType } from '@arc.module/models/interfaces/alert-type.interface';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';


@Component({
  selector: 'alert-list-view',
  templateUrl: './alert-list-view.html',
  styleUrls: ['./alert-list-view.scss']
})
export class AlertListView implements OnInit {

  displayedColumns = ['title', 'template', 'alertTypeFK', 'isSound', 'isPopup', 'isActive', 'saveInHistory', 'options'];
  dataSource: MatTableDataSource<IAlert>;

  alerts: IAlert[] = [];
  @Input() alertTypes: IAlertType[];
  @Input('alerts') set _alerts(value: IAlert[]) {
    if (value) {
      this.alerts = value;
      this.dataSource = new MatTableDataSource(this.alerts);
      this.dataSource.sort = this.sort;
    }
  }

  @Output() alertsRefresh = new EventEmitter<any>();
  @Output() alertRemoved = new EventEmitter<IAlert>();


  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
  ) {

  }

  ngAfterViewInit() {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  // ------------------ ADD --------------------

  public addAlert() {
    let newAlert: IAlert = {
      alertId: 0,
      alertTypeFk: 1,
      isActive: false,
      isPopup: false,
      isSound: false,
      prm1Title: "",
      prm2Title: "",
      prm3Title: "",
      saveInHistory: false,
      template: "",
      title: "",
      restrictedUgAlert: []
    }
    const dialogRef = this.dialog.open(AlertAddEditPresenter, {
      maxWidth: '900px',
      data: newAlert
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // user added or edited
        this.alertsRefresh.emit(true);
      }
      else { //canceled
      }
    });
  }





  // ----------- EDIT & UPDATE -----------

  public editAlert(alert: IAlert) {
    let alertToEdit: IAlert;
    alertToEdit = { ...alert };

    const dialogRef = this.dialog.open(AlertAddEditPresenter, {
      maxWidth: '900px',
      data: alertToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // user added or edited
        this.alertsRefresh.emit(true);
      }
      else { //canceled
      }
    });
  }

  // ----------- Delete -----------
  public removeAlert(alert: IAlert) {
    const dialogRef = this.dialog.open(ConfirmModalView, {
      width: '450px',
      data: `Are you sure you want to remove the alert ${alert.alertId} ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {// user pressed ok
        this.alertRemoved.emit(alert);
      }
    });
  }


  // ------------------ More ---------------
  public moreDetails(alert: IAlert) {
    this.dialog.open(AlertDetailPresenter, {
      maxWidth: "900px",
      data: alert
    });
  }

  //----------------Send-------------------
  public sendAlert(alert: IAlert) {
    const dialogRef = this.dialog.open(AlertSendPresenter, {
      maxWidth: '500px',
      data: alert
    });
  }

  getAlertTypeName(alertTypeId: number) {
    return this.alertTypes.find(x => x.value === alertTypeId).name;
  }

  ngOnInit() {

  }

}
