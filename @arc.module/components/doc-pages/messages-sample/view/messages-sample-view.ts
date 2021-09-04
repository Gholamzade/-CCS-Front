import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmModal } from '@arc.module/models/interfaces/confirm-modal';
import { MessageData } from '@arc.module/models/interfaces/message';
import { DialogService } from '@arc.module/services/dialog.service';
import { MessageService } from '@arc.module/services/message.service';

@Component({
  selector: 'messages-sample-view',
  templateUrl: './messages-sample-view.html',
  styleUrls: ['./messages-sample-view.scss'],
  providers: [
    MessageService
  ]
})
export class MessagesSampleView {

  constructor(private messageService: MessageService) { }

  showDanger() {
    let data: MessageData = {
      type: 'danger',
      message: `متن خطا و پیام، متن خطا و پیام،متن خطا
   و پیام،متن خطا و پیام،متن خطا و پیام،
   متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،<strong> تست بولد</strong> و پیام،متن خطا و پیام
   ،متن خطا`,
      title: `TITLE`
    }
    const ref = this.messageService.openSnackBar(data, {
      duration: 5000,
      panelClass: [`alert-${data.type}`, `${data.type}-snack-bar-container`]
    })

    ref.then(res => {
      //do some thing
    })
  }

  showSuccess() {
    let data: MessageData = {
      type: 'success',
      message: `متن خطا و پیام، متن خطا و پیام،متن خطا
   و پیام،متن خطا و پیام،متن خطا و پیام،
   متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،<strong> تست بولد</strong> و پیام،متن خطا و پیام
   ،متن خطا`,
      title: `<b>TITLE </b><br>NEW LINE`
    }
    const ref = this.messageService.openSnackBar(data, {
      duration: 5000,
      panelClass: [`alert-${data.type}`, `${data.type}-snack-bar-container`]
    })

    ref.then(res => {
      //do some thing
    })
  }

  showInfo() {
    let data: MessageData = {
      type: 'info',
      message: `متن خطا و پیام، متن خطا و پیام،متن خطا
   و پیام،متن خطا و پیام،متن خطا و پیام،
   متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،<strong> تست بولد</strong> و پیام،متن خطا و پیام
   ،متن خطا`,
      title: `<b>TITLE </b><br>NEW LINE`,
      hasIcon: true,
    }
    const ref = this.messageService.openSnackBar(data, {
      duration: 5000,
      panelClass: [`alert-${data.type}`, `${data.type}-snack-bar-container`]
    })

    ref.then(res => {
      //do some thing
    })
  }

  showWarning() {
    let data: MessageData = {
      type: 'warning',
      message: `متن خطا و پیام، متن خطا و پیام،متن خطا
   و پیام،متن خطا و پیام،متن خطا و پیام،
   متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،<strong> تست بولد</strong> و پیام،متن خطا و پیام
   ،متن خطا`,
      title: `<b>TITLE </b><br>NEW LINE`,
      hasIcon: false,
      closable: true
    }
    const ref = this.messageService.openSnackBar(data, {
      duration: 324000,
      panelClass: [`alert-${data.type}`, `${data.type}-snack-bar-container`]
    })

    ref.then(res => {
      //do some thing
    })
  }


}
