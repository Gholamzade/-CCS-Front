import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TableColumn } from '@arc.module/components/doc-pages/table-sample/view/table-column';
import { Heat } from 'src/app/models/Heat';
import { LanguageService } from '@arc.module/services/language.service';
import { BehaviorSubject } from 'rxjs';
import { BreakPointsService } from '@arc.module/services/break-points.service';

@Component({
  selector: 'cast-heat-view',
  templateUrl: './cast-heat-view.html',
  styleUrls: ['./cast-heat-view.scss']
})
export class CastHeatView implements OnInit {
  dir: string
  columns: TableColumn[] = [] as TableColumn[]
  testCtrl: FormControl = new FormControl()
  displayedColumns: string[] = []
  @Input() castheatList:Heat[];
  @Input('exit-produced-coil-list') exitProducedCoilList: any[]
  currentPageReportTemplate = `${this.languageService.translate('Total Records')} {totalRecords}`
  stickyHeaders: string[] = ['MetLine']
  stickyEndHeaders: string[] = ['operation-btn']

  showPageLinks$: BehaviorSubject<boolean> = this.breakPointsService.isGtMd$
  constructor(
    private languageService: LanguageService,

    private breakPointsService: BreakPointsService) {
      this.dir = languageService.getDirection()
      this.showPageLinks$.subscribe(res => {
        console.warn("this.showPageLinks$", res);
      })
     }

  isSticky(field: string) {
    return this.stickyHeaders.indexOf(field) !== -1;
  }

  isStickyEnd(field: string) {
    return this.stickyEndHeaders.indexOf(field) !== -1;
  }


  getColumns() {
 [' ', ' ', '', ''//, 'seqOfTotalSeq', 'ProductionPlan.WtNetLiquidSteel'
    , '', ''];
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
  ngOnInit(): void {
  }

}
