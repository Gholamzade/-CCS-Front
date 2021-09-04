import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';

import { MenuPageService } from '../../../services/menu-page.service'
@Component({

  selector: 'unit-selector-presenter',
  template: `
  <unit-selector-view
    [Units]="unitsFromService"
    (ChangedSelectedUnit)="SelectedUnitChanegd($event)"
  >
  </unit-selector-view>
  `,
})
export class UnitSelectorPresenter implements OnInit {

  @Output() ChangedSelectedUnit = new EventEmitter<IUnit>();

  unitsFromService: IUnit[] = [];
  selectedUnit: IUnit;

  constructor(private menuPageService: MenuPageService) {

  }

  async ngOnInit() {
    this.unitsFromService = await this.menuPageService.GetAllUnits();
  }


  SelectedUnitChanegd(unit: IUnit) {
    this.ChangedSelectedUnit.emit(unit);
  }

}
