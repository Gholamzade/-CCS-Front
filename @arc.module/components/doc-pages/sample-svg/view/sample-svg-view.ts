import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmModal } from '@arc.module/models/interfaces/confirm-modal';
import { DialogService } from '@arc.module/services/dialog.service';

@Component({
  selector: 'sample-svg-view',
  templateUrl: './sample-svg-view.html',
  // templateUrl: './plant-overview.svg',
  styleUrls: ['./sample-svg-view.scss']
})
export class SampleSvgView {
  @Input('test-input') testInput: any;
  @Output('test-output') testOutPut: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: DialogService) {

  }

  show() {
    console.log("CLICK");
    let data: ConfirmModal = {
      message: `تست ایونت  در svg`,
      messageType: 'info',
      title: `پیام اطلاعاتی`,
      confirmText: 'تایید'
    }

    this.service.confirm(data, {
      disableClose: false
    }).then(res => {
      console.warn('res: ', res);

    }).catch(err => console.error(err))
  }

}
