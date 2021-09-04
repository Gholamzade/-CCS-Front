import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';


@Component({
  selector: 'unit-selector-view',
  templateUrl: './unit-selector-view.html',
  styleUrls: ['./unit-selector-view.scss']
})
export class UnitSelectorView implements OnInit {

  @Input() Units: IUnit[];
  @Output() ChangedSelectedUnit = new EventEmitter<IUnit>();
  selectedUnit: IUnit;

  constructor() { }

  ngOnInit(): void {
  }

  onUnitChange() {
    this.ChangedSelectedUnit.emit(this.selectedUnit);
  }

}
