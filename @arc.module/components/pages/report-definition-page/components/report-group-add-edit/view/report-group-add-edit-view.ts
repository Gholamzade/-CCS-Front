import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IReportGroup } from '@arc.module/models/interfaces/report-group.interface';


@Component({
  selector: 'report-group-add-edit-view',
  templateUrl: './report-group-add-edit-view.html',
  styleUrls: ['./report-group-add-edit-view.scss']
})
export class ReportGroupAddEditView implements OnInit {

  @Input() reportGroup: IReportGroup;
  @Output() result = new EventEmitter<IReportGroup>();

  constructor() {
  }

  ngOnInit(): void {
  }


  onOkClick(): void {
    this.result.emit(this.reportGroup)
  }

}
