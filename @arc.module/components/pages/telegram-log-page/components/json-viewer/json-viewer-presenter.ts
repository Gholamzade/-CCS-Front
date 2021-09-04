import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { TelegramLogPageService } from '../../../../../services/telegram-log.service';
import { IFullTelegramLogItem } from '../../../../../models/interfaces/full-telegram-log-item.interface';
import { Subject } from 'rxjs';
import { MenuPageService } from '../../../../../services/menu-page.service';
import { TelegramDefinitionPageService } from '../../../../../services/telegram-definition-page.service';
import { IUnit } from '../../../../../models/interfaces/unit.interface';
import { ITelegramLogList } from '@arc.module/models/interfaces/telegram-log-list.interface';
import { ISimpleTelegramLogItem } from '@arc.module/models/interfaces/simple-telegram-log-item.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'json-viewer-presenter',
  template: `<json-viewer-view
  (telegramLogSelected)="telegramLogSelected($event)"
  [selectedTelegramLogData]="selectedTelegramLogData"
  [allUnits]="allUnits"
  (close)="onClose()"
  ></json-viewer-view>`

})
export class JsonViewerPresenter implements OnInit, OnDestroy {

  private destroy: Subject<void> = new Subject<void>();
  selectedTelegramLogData: IFullTelegramLogItem;
  private _selectedRow: ISimpleTelegramLogItem
  @Input() public set selectedRow(val: ISimpleTelegramLogItem) {
    this._selectedRow = val;
    console.warn("selectedRow", this._selectedRow)
    this.telegramLogSelected(this.selectedRow?.telegramLogId)
  };

  public get selectedRow(): ISimpleTelegramLogItem {
    return this._selectedRow;
  }

  private _allUnits: IUnit[]
  @Input() public set allUnits(val: IUnit[]) {
    this._allUnits = val;
    console.warn("allUnits", this.allUnits)
  }

  public get allUnits(): IUnit[] {
    return this._allUnits
  }

  constructor(
    private telegramLogService: TelegramLogPageService,
    public dialogRef: MatDialogRef<JsonViewerPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  ngOnInit() {
    if (this.data) {
      this.selectedRow = this.data.selectedLog
      this.allUnits = this.data.units
    }
  }

  async telegramLogSelected(telegramLogId: number) {
    if (telegramLogId) {
      this.selectedTelegramLogData = await this.telegramLogService.getFullTelegramLog(telegramLogId);
    }
  }

  onClose() {
    this.dialogRef.close()
  }

}
