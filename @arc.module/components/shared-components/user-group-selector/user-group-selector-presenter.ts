import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';

import { UserPageService } from '../../../services/user-page.service';



@Component({

  selector: 'user-group-selector-presenter',
  template: `
  <user-group-selector-view
    [UserGroups]="groupsFromService"
    [SelectedGroups]="selectedGroups"
[Title]="title"
    (ChangedSelectedGroups)="SelectedGroupsChanegd($event)"
  >
  </user-group-selector-view>
  `,
})
export class UserGroupSelectorPresenter implements OnInit {

  @Output() ChangedSelectedGroups = new EventEmitter<IUserGroup[]>();
  @Input() SelectedGroupsId: number[] = [];
  @Input() title: string;

  groupsFromService: IUserGroup[] = [];
  selectedGroups: IUserGroup[] = [];


  constructor(private userPageService: UserPageService) {

  }

  async ngOnInit() {
    this.groupsFromService = await this.userPageService.GetAllGroups();
    this.groupsFromService.forEach(element => {
      //let isSelected = false;
      this.SelectedGroupsId.forEach(selectedId => {
        if (element.userGroupId === selectedId) {
          this.selectedGroups.push(element);
        }
      });
    });
    if (!this.title)
      this.title = "";
  }


  SelectedGroupsChanegd(groups: IUserGroup[]) {
    this.ChangedSelectedGroups.emit(groups);
  }

}
