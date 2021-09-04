import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LanguageService } from '@arc.module/services/language.service';
import { TableColumn } from "./table-column";
import { BreakPointsService } from '@arc.module/services/break-points.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'cast-heat-view',
  templateUrl: './cast-heat-view.html',
  styleUrls: ['./cast-heat-view.scss'],
})
export class CastHeatView  implements OnInit {
  dir: string
  columns: TableColumn[] = [] as TableColumn[]
  displayedColumns: string[] = []
  testCtrl: FormControl = new FormControl()
  @Input('cast-heat-list') castHeatList: any[]
  stickyEndHeaders: string[] = ['operation-btn']
  stickyHeaders: string[] = ['fatherName']

    currentPageReportTemplate = `${this.languageService.translate('Total Records')} {totalRecords}`

  showPageLinks$: BehaviorSubject<boolean> = this.breakPointsService.isGtMd$
  constructor(
    private router: Router,
    private languageService: LanguageService,
    private breakPointsService: BreakPointsService,
  ) {
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

      { field: "MetLine", header: "MetLine", cell: (element: any) => element.metLine },
      { field: "LadleArrivalTime", header: "LadleArrival Time", cell: (element: any) => element.ladleArrivalTime },
      { field: "HeatStart", header: "Heat Start", cell: (element: any) => element.heatStart },
      { field: "HeatEnd", header: "Heat End", cell: (element: any) => element.heatEnd },
      { field: "LSGOQWtNet", header: "LSGO Weight", cell: (element: any) => element.lsgoqwtNet },
      { field: "ISGProduced", header: "Produced ISG ", cell: (element: any) => element.isgproduced },

      { field: "rowNum", header: "Row", cell: (element: any) => element.rowNum },
      {
        field: "operation-btn", header: "عملیات",
        styles: `display: flex;justify-content: space-evenly;align-items: center;`,
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
  }
}
