import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalPresenter } from "../components/shared-components/confirm-modal/confirm-modal-presenter";
import { ConfirmModal, ConfirmModalResult } from '../models/interfaces/confirm-modal';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  async confirm(data: ConfirmModal, matDialogConfig?: MatDialogConfig) {

    let panelClass = `${data.messageType}-modal-panel`
    const dialogRef = this.dialog.open(ConfirmModalPresenter, {
      maxWidth: '900px',
      panelClass: panelClass,
      data: data,
      disableClose: true,
      role: 'alertdialog',
      ...matDialogConfig
    });

    return await dialogRef.afterClosed().toPromise<ConfirmModalResult>()
  }
}
