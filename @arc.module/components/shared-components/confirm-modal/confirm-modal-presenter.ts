import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '@arc.module/services/language.service';
import { ConfirmModal, ConfirmModalResult, MessageType } from "../../../models/interfaces/confirm-modal";
@Component({
  selector: 'confirm-modal-presenter',
  template: `
  <confirm-modal-view
    [input-data]="inputData"
    [title]="title"
    [message]="message"
    [message-type]="messageType"
    [confirm-text]="confirmText"
    [cancel-text]="cancelText"
    [messageDirection]="messageDirection"
    [titleDirection]="titleDirection"
    (on-confirm)="onConfirm($event)"
    (on-close)="onClose($event)"
  >
  </confirm-modal-view>`,
})
export class ConfirmModalPresenter implements OnInit {

  title: string;
  message: string;
  confirmText: string = "Confirm";
  cancelText: string = "Cancel";
  titleDirection: string
  messageDirection: string
  messageIcon: string;

  // icon: string;
  inputData: any;
  messageType: MessageType
  constructor(
    public modalRef: MatDialogRef<ConfirmModalPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModal,
    private languageService: LanguageService
  ) {
    this.title = data.title;
    this.confirmText = data?.confirmText ? data?.confirmText : this.confirmText;
    this.cancelText = data?.cancelText ? data?.cancelText : this.cancelText;
    this.title = data?.title;
    this.message = data?.message;
    // this.icon = data.icon;
    this.inputData = data?.inputData;
    this.messageType = data?.messageType
    this.messageIcon = data?.messageIcon
    this.messageDirection = data?.messageDirection ? data?.messageDirection : languageService.getDirection()
    this.titleDirection = data?.titleDirection ? data?.titleDirection : languageService.getDirection()

  }

  ngOnInit() {
  }

  onConfirm(confirmModalResult: ConfirmModalResult): void {
    this.modalRef.close(confirmModalResult);
  }

  onClose(confirmModalResult: ConfirmModalResult): void {
    this.modalRef.close(confirmModalResult);
  }
}
