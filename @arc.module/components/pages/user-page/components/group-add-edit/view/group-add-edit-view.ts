import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';



@Component({
  selector: 'group-add-edit-view',
  templateUrl: './group-add-edit-view.html',
  styleUrls: ['./group-add-edit-view.scss']
})
export class GroupAddEditView implements OnInit {

  private _group: IUserGroup
  @Input() set group(val: IUserGroup) {
    if (val) {
      this._group = val;
    }
  };
  get group(): IUserGroup {
    return this._group
  }
  @Output() result = new EventEmitter<IUserGroup>();
  constructor() {
  }
  ngOnInit(): void {

  }

  onOkClick(): void {
    this.result.emit(this.group);
  }

}
