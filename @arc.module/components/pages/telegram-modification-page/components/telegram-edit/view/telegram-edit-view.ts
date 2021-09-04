import { Component, Inject, HostListener, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IRestrictedUgTelegram } from '@arc.module/models/interfaces/restricted-ug-telegram.interface';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';




@Component({
  selector: 'telegram-edit-view',
  templateUrl: './telegram-edit-view.html',
  styleUrls: ['./telegram-edit-view.scss']
})
export class TelegramEditView implements OnInit {

  @Input() telegram: ITelegram;
  @Input() selectedGroupsId: number[] = [];
  @Output() result = new EventEmitter<ITelegram>();

  constructor() {
  }


  ngOnInit(): void {
  }


  onOkClick(): void {
    this.result.emit(this.telegram);
  }

  onSelectedGroupsChange(groups: IUserGroup[]) {
    this.telegram.restrictedUgTelegram = [];
    groups.forEach(element => {
      const restrictedUgTelegram: IRestrictedUgTelegram = {
        restrictUgTelegramId: 0,
        telegramFk: this.telegram.telegramId,
        userGroupFk: element.userGroupId
      }
      this.telegram.restrictedUgTelegram.push(restrictedUgTelegram);
    });
  }
}
