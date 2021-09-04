import { IShiftAuto } from '@arc.module/models/interfaces/shift-auto.interface';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ShfitPageApiCallerService } from '../../../../../services/shfit-page-api-caller.service';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IShift } from '@arc.module/models/interfaces/shift.interface';
import { ITeam } from '@arc.module/models/interfaces/team.interface';

@Component({
  selector: 'app-auto-assign-presenter',
  template: `<auto-assign-view
    [shifts]="shifts"
    [teams]="teams"
    [saveResult]="saveResult"
    (shiftAssginList)="changeShiftAssgin($event)"
     ></auto-assign-view>`,
})

export class AutoAssignPresenter implements OnInit {
  @Input() dialog: MatDialog
  shifts: IShift[];
  teams: ITeam[];
  saveResult: boolean;
  constructor(public dialogRef: MatDialogRef<AutoAssignPresenter>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private shfitPageApiCallerService: ShfitPageApiCallerService
  ) { }

  async ngOnInit(): Promise<void> {
    this.shifts = await this.shfitPageApiCallerService.getAllShifts();
    this.teams = await this.shfitPageApiCallerService.getAllTeam();
  }
  async changeShiftAssgin(autoModel: IShiftAuto) {
    var res: IServerResponse = await this.shfitPageApiCallerService.autoShiftAssgin(autoModel);
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId == 200) {
      this.dialogRef.close();
    }
  }

}
