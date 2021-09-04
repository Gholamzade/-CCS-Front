import { Component, OnInit } from '@angular/core';
import { BreakPointsService } from '@arc.module/services/break-points.service';
import { IrisaDate } from '@arc.module/utilities/date-utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'report-sample-view',
  templateUrl: './report-sample-view.html',
  styleUrls: ['./report-sample-view.scss']
})
export class ReportSampleView implements OnInit {
  viewerContainerStyle = {
    position: 'relative',
    // width: '1000px',
    height: '655px',
    ['font-family']: 'ms sans serif'
  };

  startDate: IrisaDate //1398/11/12  1399-11-12 00:00:00
  endDate: IrisaDate //1398/11/14
  productSubcategory: any
  productCategory: any

  params: any = new Subject<any>()
  constructor(public breakPointService: BreakPointsService) { }

  ngOnInit(): void {
  }

  getSelectedStartDate(startDate: IrisaDate) {
    this.startDate = startDate
  }
  getSelectedEndDate(endDate: IrisaDate) {
    this.endDate = endDate
  }

  search() {
    this.params.next({
      StartDate: this.startDate ? this.startDate.toString(false, '/') : '',
      EndDate: this.endDate ? this.endDate.toString(false, '/') : '',
    })

  }

}
