import { Component, Inject, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMenu } from '@arc.module/models/interfaces/menu.interface';

@Component({
  selector: 'menu-add-edit-view',
  templateUrl: 'menu-add-edit-view.html'
})
export class MenuAddEditView {

  @Input() menu: IMenu;
  @Output() result = new EventEmitter<IMenu>();

  constructor() {
  }


  onOkClick(): void {
    this.result.emit(this.menu)
  }

}
