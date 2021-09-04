import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface ConfirmationDialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-confirm-dialog-presenter',
  template: `<confirm-dialog-view
  [title]="title"
  [message]="message"
  (doDelete)="checkDeleteConfirmationResult($event)"
  ></confirm-dialog-view>`
})
export class ConfirmDialogPresenter implements OnInit {
  title;
  message;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
    // console.log(data);
    this.title = data.title;
    this.message = data.message;
  }

  checkDeleteConfirmationResult(event) {
    this.dialogRef.close(event);
  }

  ngOnInit(): void {
  }

}
