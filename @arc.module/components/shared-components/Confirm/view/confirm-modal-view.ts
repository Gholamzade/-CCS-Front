import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-modal-view',
  templateUrl: 'confirm-modal-view.html',
})
export class ConfirmModalView {

  _confirmText: String;
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalView>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // if (data as User != null)
    this._confirmText = data;

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onOkClick(): void {

    this.dialogRef.close(true);

  }

}
