import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LanguageService } from '@arc.module/services/language.service';
import { TableColumn } from "./table-column";
import { BreakPointsService } from '@arc.module/services/break-points.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'doc-table-sample-view',
  templateUrl: './table-sample-view.html',
  styleUrls: ['./table-sample-view.scss'],
})
export class DocTableSampleView implements OnInit {
  dir: string
  columns: TableColumn[] = [] as TableColumn[]
  displayedColumns: string[] = []
  testCtrl: FormControl = new FormControl()
  @Input('exit-produced-coil-list') exitProducedCoilList: any[]
  stickyEndHeaders: string[] = ['operation-btn']
  stickyHeaders: string[] = ['fatherName']

  // currentPageReportTemplate = `{currentPage} ${this.languageService.translate('of')} {totalPages}`
  // currentPageReportTemplate = `${this.languageService.translate('Show Page Number')} {currentPage} ${this.languageService.translate('of')} {totalPages}`
  currentPageReportTemplate = `${this.languageService.translate('Total Records')} {totalRecords}`

  showPageLinks$: BehaviorSubject<boolean> = this.breakPointsService.isGtMd$
  constructor(
    private router: Router,
    private languageService: LanguageService,
    private breakPointsService: BreakPointsService,
  ) {
    console.log("exitProducedCoilList", this.exitProducedCoilList);
    this.dir = languageService.getDirection()
    this.showPageLinks$.subscribe(res => {
      console.warn("this.showPageLinks$", res);
    })
  }

  ngOnInit(): void {

    this.getColumns()
  }

  sortData(event) {
    console.log(event);
  }

  getColumns() {

    this.columns = [
      { field: "fatherName", header: "Father Name", cell: (element: any) => element.fatherName },
      { field: "cutType", header: "Cut Type", cell: (element: any) => element.cutType },
      { field: "widthMm", header: "Width (mm)", cell: (element: any) => element.widthMm },
      { field: "lengthM", header: "Length (m)", cell: (element: any) => element.lengthM },
      { field: "weightKg", header: "Weigh (kg)", cell: (element: any) => element.weightKg },
      { field: "rollTimeMin", header: "Roll Time (min)", cell: (element: any) => element.rollTimeMin },
      { field: "pdw", header: "pdw", cell: (element: any) => element.pdw },
      { field: "stoppingTime", header: "Stopping Time (s)", cell: (element: any) => element.stoppingTime },
      { field: "preparingTime", header: "Preparing Time (s)", cell: (element: any) => element.preparingTime },
      { field: "producedTime", header: "Produced Time", cell: (element: any) => element.producedTime },
      { field: "shiftNo", header: "Shift", cell: (element: any) => element.shiftNo },
      { field: "teamNo", header: "Team", cell: (element: any) => element.teamNo },
      { field: "scheduleNum", header: "Program", cell: (element: any) => element.scheduleNum },
      { field: "rowNum", header: "Row", cell: (element: any) => element.rowNum },
      {
        field: "operation-btn", header: "",
        styles: `display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        `,
        cell: (element: any) => element
      },

    ];
    this.displayedColumns = this.columns.map(c => c.field);

  }

  isSticky(field: string) {
    return this.stickyHeaders.indexOf(field) !== -1;
  }
  isStickyEnd(field: string) {
    return this.stickyEndHeaders.indexOf(field) !== -1;
  }

  primePaginate(event) {
    console.log(event);
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
  }
}
