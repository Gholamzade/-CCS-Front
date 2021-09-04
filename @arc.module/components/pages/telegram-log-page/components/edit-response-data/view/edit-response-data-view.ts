import { ITelegramSimulate } from '@arc.module/models/interfaces/telegram-simulate.interface';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { JsonEditorComponent, JsonEditorMode, JsonEditorOptions } from 'ang-jsoneditor';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IUnit } from '@arc.module/models/interfaces/unit.interface';
import { IFullTelegramLogItem } from '@arc.module/models/interfaces/full-telegram-log-item.interface';

@Component({
  selector: 'edit-response-data-view',
  templateUrl: './edit-response-data-view.html',
  styleUrls: ['./edit-response-data-view.scss']
})
export class EditResponseDataView implements OnInit {

  @Input() selectedLog: IFullTelegramLogItem;
  @Input() units: IUnit[];
  @Output() sendSimulatedTelegram: EventEmitter<ITelegramSimulate> = new EventEmitter<ITelegramSimulate>();
  public editorOptions: JsonEditorOptions;
  json: JSON = {} as JSON;
  modes: JsonEditorMode[] = ['tree', 'view', 'form', 'code', 'text']
  //public data: any;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  constructor(private _snackBar: MatSnackBar) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = this.modes
  }

  ngOnInit(): void {
    this.json = JSON.parse(this.selectedLog.requestData);
  }

  getUnitById(unitId: number) {
    return this.units.find(x => x.unitId === unitId);
  }

  swap() {
    let temp = this.selectedLog.dstUnitFk;
    this.selectedLog.dstUnitFk = this.selectedLog.srcUnitFk;
    this.selectedLog.srcUnitFk = temp;
  }

  sendTelegram() {
    const simulateModel: ITelegramSimulate = {
      dstId: this.selectedLog.dstUnitFk,
      srcId: this.selectedLog.srcUnitFk,
      telId: this.selectedLog.requestId,
      data: this.json
    }
    this.sendSimulatedTelegram.emit(simulateModel);
  }


}
