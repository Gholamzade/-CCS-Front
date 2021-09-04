
import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditResponseDataPresenter } from '../../edit-response-data/edit-response-data-presenter'
import { ITelegramLogList } from '../../../../../../models//interfaces/telegram-log-list.interface';
import { IFullTelegramLogItem } from '../../../../../../models//interfaces/full-telegram-log-item.interface';
import { ITelegramLogFilter } from '../../../../../../models//interfaces/telegram-log-filter.interface';
import { ISimpleTelegramLogItem } from '../../../../../../models//interfaces/simple-telegram-log-item.interface';
import { IUnit } from "../../../../../../models/interfaces/unit.interface";

@Component({
  selector: 'json-viewer-view',
  templateUrl: './json-viewer-view.html',
  styleUrls: ['./json-viewer-view.scss']
})
export class JsonViewerView implements OnInit {

  selectedRowIndex?: number;
  telegramLogList: ITelegramLogList;
  requestData: JSON = {} as JSON
  responseData: JSON = {} as JSON
  unitOfTelegramLog: IUnit
  @Input() allUnits: IUnit[];
  private _selectedTelegramLogData: IFullTelegramLogItem
  @Input() set selectedTelegramLogData(val: IFullTelegramLogItem) {
    if (val) {
      this._selectedTelegramLogData = val
      this.requestData =
        this._selectedTelegramLogData?.requestData ? JSON.parse(this._selectedTelegramLogData?.requestData) : {};
      this.responseData =
        this._selectedTelegramLogData?.responseData ? JSON.parse(this._selectedTelegramLogData?.responseData) : {};
      this.getUnitById(this._selectedTelegramLogData.srcUnitFk)
    }
  };

  get selectedTelegramLogData(): IFullTelegramLogItem {
    return this._selectedTelegramLogData
  }

  @Output() telegramLogSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  openDialog() {
    let selectedLogToSimulate = { ...this.selectedTelegramLogData };
    let changeresponse: any;
    const dialogRef = this.dialog.open(EditResponseDataPresenter, {
      maxWidth: '700px',
      data: { selectedLog: selectedLogToSimulate, units: this.allUnits }
    });
    dialogRef.afterClosed().subscribe(result => {
      changeresponse = result;
    });
  }

  public selectTelegramLog(telegramLog: ISimpleTelegramLogItem) {
    this.selectedTelegramLogData = {} as IFullTelegramLogItem;
    this.telegramLogSelected.emit(telegramLog.telegramLogId)
  }

  getUnitById(unitId: number) {
    this.unitOfTelegramLog = this.allUnits.find(x => x.unitId === unitId);
  }

  onClose() {
    this.close.emit()
  }

}
