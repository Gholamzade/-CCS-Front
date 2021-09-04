import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmModalResult, MessageType } from '@arc.module/models/interfaces/confirm-modal';
import { LanguageService } from '@arc.module/services/language.service';
@Component({
  selector: 'confirm-modal-view',
  templateUrl: './confirm-modal-view.html',
  styleUrls: ['./confirm-modal-view.scss']
})
export class ConfirmModalView implements OnInit {

  @Input('input-data') inputData: any;
  @Input() title: string;
  @Input() message: string;
  @Input() direction: string;
  @Input() messageDirection: string;
  @Input() titleDirection: string;
  @Input() messageIcon: string;
  // @Input() icon: string;
  @Input('message-type') messageType: MessageType;
  @Input('confirm-text') confirmText: string = "Confirm";
  @Input('cancel-text') cancelText: string = "Cancel";
  @Output('on-confirm') onConfirmEvent: EventEmitter<ConfirmModalResult> = new EventEmitter<ConfirmModalResult>()
  @Output('on-close') onCloseEvent: EventEmitter<ConfirmModalResult> = new EventEmitter<ConfirmModalResult>()

  constructor() { }

  ngOnInit() {
  }

  onConfirm(result: boolean): void {
    // Close the modal, return true
    this.onConfirmEvent.emit({
      messageType: this.messageType,
      result: result
    })
  }

  onClose(result: boolean): void {
    // Close the modal, return false
    this.onCloseEvent.emit({
      messageType: this.messageType,
      result: result
    })
  }
}
