import { Component, Inject, HostListener, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';
import { IRestrictedUgAlert } from '@arc.module/models/interfaces/restricted-ug-alert.interface';
import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';




@Component({
  selector: 'alert-add-edit-view',
  templateUrl: './alert-add-edit-view.html',
  styleUrls: ['./alert-add-edit-view.scss']
})
export class AlertAddEditView implements OnInit {

  @Input() alert: IAlert;
  @Input() alertTypes: any[];
  @Input() isInEditMode: boolean;
  @Input() selectedGroupsId: number[] = [];
  @Output() result = new EventEmitter<IAlert>();



  constructor() {
  }


  ngOnInit(): void {
  }

  isSoundChanged() {
    if (this.alert.isSound)
      this.alert.isPopup = true;
  }

  alertTypeChange() {
    this.alert.isPopup = false;
    this.alert.isSound = false;
  }


  onOkClick(): void {
    this.result.emit(this.alert);
  }

  onSelectedGroupsChange(groups: IUserGroup[]) {
    this.alert.restrictedUgAlert = [];
    groups.forEach(element => {
      const restrictedUgAlert: IRestrictedUgAlert = {
        restrictUgAlertId: 0,
        alertFk: this.alert.alertId,
        userGroupFk: element.userGroupId
      }
      this.alert.restrictedUgAlert.push(restrictedUgAlert);
    });
  }
}
