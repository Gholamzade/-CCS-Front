
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';




@Component({
  selector: 'user-group-selector-view',
  templateUrl: './user-group-selector-view.html',
  styleUrls: ['./user-group-selector-view.scss']
})
export class UserGroupSelectorView implements OnInit {

  @Input() SelectedGroups: IUserGroup[] = [];
  @Input() UserGroups: IUserGroup[] = [];
  @Input() Title: string;

  @Output() ChangedSelectedGroups = new EventEmitter<IUserGroup[]>();

  constructor() { }

  ngOnInit(): void {

  }

  SelectedGroupsChanged() {
    this.ChangedSelectedGroups.emit(this.SelectedGroups)
  }

}
