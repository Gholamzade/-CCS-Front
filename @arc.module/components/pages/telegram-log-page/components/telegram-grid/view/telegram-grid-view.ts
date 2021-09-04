
import { Component, OnInit, ViewChild, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditResponseDataPresenter } from '../../edit-response-data/edit-response-data-presenter'
import { IUnit } from '@arc.module/models/interfaces/unit.interface';
import { ITelegramLogList } from '@arc.module/models/interfaces/telegram-log-list.interface';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';
import { IFullTelegramLogItem } from '@arc.module/models/interfaces/full-telegram-log-item.interface';
import { ITelegramLogFilter } from '@arc.module/models/interfaces/telegram-log-filter.interface';
import { ISimpleTelegramLogItem } from '@arc.module/models/interfaces/simple-telegram-log-item.interface';
import { Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { BreakPointsService } from "@arc.module/services/break-points.service";
import { JsonViewerPresenter } from '../../json-viewer/json-viewer-presenter';




@Component({
  selector: 'telegram-grid-view',
  templateUrl: './telegram-grid-view.html',
  styleUrls: ['./telegram-grid-view.scss']
})
export class TelegramGridView implements OnInit {

  selectedTelegramLogRow: Subject<ISimpleTelegramLogItem> = new Subject<ISimpleTelegramLogItem>();
  displayedColumns = [];
  @ViewChild('table', { read: ElementRef }) table: ElementRef;
  telegramLogList: ITelegramLogList;
  @Input('telegramLogList') set inputTelegrams(value: ITelegramLogList) {
    this.selectedTelegramLogData = null;
    this.telegramLogList = value;
  }

  @Input() telegrams: ITelegram[];
  @Input() loadingSimpleTelegramLogs: boolean = true;

  private _selectedTelegramLogData: IFullTelegramLogItem
  @Input() set selectedTelegramLogData(val: IFullTelegramLogItem) {
    if (val) {
      this._selectedTelegramLogData = val
    }
  };

  get selectedTelegramLogData(): IFullTelegramLogItem {
    return this._selectedTelegramLogData
  }


  @Input() allUnits: IUnit[];
  @Output() pagerFilter: EventEmitter<ITelegramLogFilter> = new EventEmitter<ITelegramLogFilter>();
  @Output() telegramLogSelected: EventEmitter<number> = new EventEmitter<number>();
  columns = [
    { columnDef: 'requestId', header: 'Telegram Id', cell: (element: ISimpleTelegramLogItem) => `${element.requestId}` },
    { columnDef: 'telegramTitle', header: 'tel name', cell: (element: any) => `` },
    // { columnDef: 'telegramLogId', header: 'telegramLogId', cell: (element: ISimpleTelegramLogItem) => `${element.telegramLogId}` },
    { columnDef: 'srcUnitFk', header: 'srcUnitFk', cell: (element: ISimpleTelegramLogItem) => `${element.srcUnitFk}` },
    { columnDef: 'dstUnitFk', header: 'dstUnitFk', cell: (element: ISimpleTelegramLogItem) => `${element.dstUnitFk}` },
    { columnDef: 'telegramLogDate', header: 'telegramLogDate', cell: (element: ISimpleTelegramLogItem) => `${element.telegramLogDate}` },
    { columnDef: 'simulated', header: 'simulated', cell: (element: ISimpleTelegramLogItem) => `${element.simulated}` },
    { columnDef: 'operation-btn', header: 'Operation Button', cell: (element) => console.warn(element) },
  ];

  constructor(
    public dialog: MatDialog,
    public breakPointService: BreakPointsService
  ) { }

  ngOnInit() {
    // this.pageSizeOptions = [5, 10, 25, 100];
    // this._dataSource.paginator = this.paginator;
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.breakPointService.isXs$.subscribe(res => {
      console.error("isXSmall", res)
    })
  }

  // openDialog() {
  //   let selectedLogToSimulate = { ...this.selectedTelegramLogData };
  //   let changeresponse: any;
  //   const dialogRef = this.dialog.open(EditResponseDataPresenter, {
  //     maxWidth: '700px',
  //     data: { selectedLog: selectedLogToSimulate, units: this.allUnits }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     changeresponse = result;
  //   });
  // }

  openJsonViewerDialog(selectedLogToShow: ISimpleTelegramLogItem) {
    const dialogRef = this.dialog.open(JsonViewerPresenter, {
      maxWidth: '100%',
      data: {
        selectedLog: selectedLogToShow,
        units: this.allUnits
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public selectTelegramLog(telegramLog: ISimpleTelegramLogItem) {
    if (this.breakPointService.isXs) {
      console.warn("selectTelegramLog")
    } else {
      this.selectedTelegramLogData = null;
      this.selectedTelegramLogRow.next(telegramLog);
      this.telegramLogSelected.emit(telegramLog.telegramLogId)
    }

  }

  getUnitById(unitId: number) : IUnit {
    let unit = this.allUnits.find(x => x.unitId === unitId);
    console.log('unit: ', unit);
    return unit
  }

  changePage(value: PageEvent) {
    let previousPageIndex = value.previousPageIndex;
    let pageSize = value.pageSize;
    let pageIndex = value.pageIndex;
    let lastLogId: number = 0;
    let direction: number = 0;

    if (pageIndex > previousPageIndex) {
      direction = 1;
      lastLogId = this.telegramLogList.telegramLogItems[this.telegramLogList.telegramLogItems.length - 1].telegramLogId
    }
    else if (pageIndex < previousPageIndex) {
      direction = -1;
      lastLogId = this.telegramLogList.telegramLogItems[0].telegramLogId
    }

    let filters: ITelegramLogFilter = {
      direction: direction,
      pageSize: pageSize,
      lastLogId: lastLogId
    }

    this.pagerFilter.emit(filters);
    this.scrollToTop()
  }


  scrollToTop() {
    this.table.nativeElement.scrollIntoView(true);
  }

  // get code() {
  //   try {
  //     return JSON.stringify(this.data, null, 2);
  //   }
  //   catch (e) {
  //     console.log('error occored get code');
  //   };
  // }

  // set code(v) {
  //   try {
  //     this.data = JSON.parse(v);
  //   }
  //   catch (e) {
  //     console.log('error occored on set code');
  //   };
  // }
  // editJson() {

  //   try {
  //     this.editmode = !this.editmode;
  //   }
  //   catch (e) {
  //     console.log('error occored on editJson');
  //   };


  // }
  // send(telegramforsend: ITelegram) {
  //   //telegramforsend.date = new Date();
  //   this.sendtelegramClick.emit(telegramforsend);
  // }


  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }
}
