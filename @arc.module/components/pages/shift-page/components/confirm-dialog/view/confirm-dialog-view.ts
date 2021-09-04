import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'confirm-dialog-view',
  templateUrl: './confirm-dialog-view.html',
  styleUrls: ['./confirm-dialog-view.scss']
})
export class ConfirmDialogView implements OnInit {
  @Input() title;
  @Input() message;
  @Output() doDelete = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onDismiss() {
    this.doDelete.emit(false);
  }

  onConfirm() {
    this.doDelete.emit(true);
  }
}
