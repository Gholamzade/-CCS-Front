import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';




@Component({
  selector: 'menu-page-view',
  templateUrl: './menu-page-view.html',
  styleUrls: ['./menu-page-view.scss']
})
export class MenuPageView implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  selectedUnit: IUnit;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  selectedUnitChanged(unit: IUnit) {
    this.selectedUnit = unit;
  }

}
