import { IUnit } from '@arc.module/models/interfaces/unit.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'report-definition-page-view',
  templateUrl: './report-definition-page-view.html',
  styleUrls: ['./report-definition-page-view.scss']
})
export class ReportDefinitionPageView implements OnInit {

  selectedUnit: IUnit;

  constructor() { }

  ngOnInit(): void {
  }

  selectedUnitChanged(unit: IUnit) {
    this.selectedUnit = unit;
  }

}
