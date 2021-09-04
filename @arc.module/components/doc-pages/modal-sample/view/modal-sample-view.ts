import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmModal } from '@arc.module/models/interfaces/confirm-modal';
import { DialogService } from '@arc.module/services/dialog.service';

@Component({
  selector: 'modal-sample-view',
  templateUrl: './modal-sample-view.html',
  styleUrls: ['./modal-sample-view.scss']
})
export class ModalSampleView {
  @Input('test-input') testInput: any;
  @Output('test-output') testOutPut: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialogService: DialogService) {

  }

  coilnumber: number = 912000235


  openSuccessDialog() {
    let data: ConfirmModal = {
      message: ` تست من فارسی و English text و تغییر direction مودال در پیام`,
      inputData: this.coilnumber,
      messageType: 'success',
      title: `remove the ${this.coilnumber}`,
      cancelText: 'NO',
      confirmText: 'YES',
      messageDirection: 'rtl',
      titleDirection: 'rtl',
    }

    this.dialogService.confirm(data).then(res => {
      console.warn('res: ', res);
      if (res.result) {

        // you can write any code you like

      } else {

        // you can write any code you like

      }
    }).catch(err => console.error(err))
  }
  openInfoDialog() {
    let data: ConfirmModal = {
      message: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ`,
      inputData: this.coilnumber,
      messageType: 'info',
      title: `پیام اطلاعاتی`,
      confirmText: 'تایید'
    }

    this.dialogService.confirm(data, {
      disableClose: false
    }).then(res => {
      console.warn('res: ', res);
      if (res.result) {

        // you can write any code you like

      } else {

        // you can write any code you like

      }
    }).catch(err => console.error(err))
  }

  openWarningDialog() {
    let data: ConfirmModal = {
      message: `Are you sure you want to remove the ${this.coilnumber} coil?`,
      inputData: this.coilnumber,
      messageType: 'warning',
      title: `remove the ${this.coilnumber}`,
      cancelText: 'خذف',
      confirmText: 'بستن'
    }

    this.dialogService.confirm(data).then(res => {
      console.warn('res: ', res);
      if (res.result) {

        // you can write any code you like

      } else {

        // you can write any code you like

      }
    }).catch(err => console.error(err))
  }

  openDangerDialog() {
    let data: ConfirmModal = {
      message: `متن خطا و پیام، متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام، متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا و پیام،متن خطا`,
      inputData: this.coilnumber,
      messageType: 'danger',
      title: `عنوان خطا و پیام `,
      cancelText: 'خیر',
      confirmText: 'بلی'
    }

    this.dialogService.confirm(data).then(res => {
      console.warn('res: ', res);
      if (res.result) {

        // you can write any code you like

      } else {

        // you can write any code you like

      }
    }).catch(err => console.error(err))
  }
}
