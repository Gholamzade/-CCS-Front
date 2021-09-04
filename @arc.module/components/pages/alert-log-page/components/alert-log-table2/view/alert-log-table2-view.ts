import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { AlertLogFilterDialogPresenter } from '../../alert-log-filter-dialog/alert-log-filter-dialog-presenter';
import { IAlertLogList } from '@arc.module/models/interfaces/alert-log-list.interface';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';
import { IAlertLogFilter } from '@arc.module/models/interfaces/alert-log-filter.interface';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from '@arc.module/services/language.service';
import { BreakPointsService } from '@arc.module/services/break-points.service';

@Component({

  selector: 'alert-log-table2-view',
  templateUrl: './alert-log-table2-view.html',
  styleUrls: ['./alert-log-table2-view.scss']
})
export class AlertLogTable2View implements AfterViewInit, OnInit {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() alertLogList: IAlertLogList;
  @Input() defaultRows: number;
  @Output() pagerFilter: EventEmitter<IAlertLogFilter> = new EventEmitter<IAlertLogFilter>()
  @ViewChild('table', { read: ElementRef }) table: ElementRef;
  currentPageReportTemplate = `${this.languageService.translate('Total Records')} {totalRecords}`

  showPageLinks$: BehaviorSubject<boolean> = this.breakPointsService.isGtMd$
  columns = [
    { columnDef: 'alertId', header: 'Alert Id', cell: (element: any) => `${element.alertId}` },
    { columnDef: 'logText', header: 'Log Text', cell: (element: any) => `${element.logText}` },
    { columnDef: 'logDate', header: 'Log Date', cell: (element: any) => `${element.logDate}` },
    { columnDef: 'title', header: 'Title', cell: (element: any) => `${element.title}` },
    { columnDef: 'operation', header: 'operation', cell: (element: any) => `` },
  ];


  constructor(
    private dialog: MatDialog,
    private languageService: LanguageService,
    private breakPointsService: BreakPointsService
  ) { }


  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  ngAfterViewInit() {

  }

  showDetails(rowData: IAlertLogItem): void {
    const dialogRef = this.dialog.open(AlertLogFilterDialogPresenter, {
      width: 'auto',
      data: { alertLogItem: rowData },
      panelClass: ['custom-dialog'],
      backdropClass: "dialog-back-drop"
    });
  }

  changePage(value: PageEvent) {
    let previousPageIndex = value.previousPageIndex + 1;
    let pageSize = value.pageSize;
    let pageIndex = value.pageIndex + 1;
    let filters: IAlertLogFilter = {
      pageNumber: pageIndex,
      pageSize: pageSize,
    }

    this.pagerFilter.emit(filters);
    this.scrollToTop()
  }


  scrollToTop() {
    this.table.nativeElement.scrollIntoView(true);
  }

  primePaginate(event) {
    console.log(event);
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    let filters: IAlertLogFilter = {
      pageNumber: event.page,
      pageSize: event.rows,
    }

    this.pagerFilter.emit(filters);
    this.scrollToTop()
  }

}
