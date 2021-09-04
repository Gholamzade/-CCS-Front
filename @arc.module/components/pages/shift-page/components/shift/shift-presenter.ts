import { Component, OnInit } from '@angular/core';

import { ShfitPageApiCallerService } from '../../../../../services/shfit-page-api-caller.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogPresenter } from '../confirm-dialog/confirm-dialog-presenter.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IShift } from '@arc.module/models/interfaces/shift.interface';


@Component({
  selector: 'shift-presenter',
  template: `<shift-view
    [shiftArray]="shifts"
    [messageToShow]="messageToShow"
    [minutesOfADay]="minutesOfADay"
    (newShift)="addShift($event)"
    (editShift)="editShift($event)"
    (deleteShift)="deleteShift($event)"
  ></shift-view>`,
})
export class ShiftPresenter implements OnInit {
  shifts: IShift[] = [];
  minutesOfADay: number[] = new Array(1440);
  messageToShow: { message: string; action: string };
  constructor(
    private snackBar: MatSnackBar,
    private shfitPageApiCallerService: ShfitPageApiCallerService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.RefreshShiftList();
  }

  async RefreshShiftList() {
    this.minutesOfADay = new Array(1440);
    this.shifts = [];
    this.shifts = await this.shfitPageApiCallerService.getAllShifts();
    this.shifts.forEach((element) => {
      let startNo = this._dateToMinute(element.startTime);
      let endNo = this._dateToMinute(element.endTime);
      if (startNo < endNo) {
        for (let i = startNo; i <= endNo; i++)
          this.minutesOfADay[i] = element.shiftTimeId;
      } else {
        for (let i = startNo; i <= 1440; i++)
          this.minutesOfADay[i] = element.shiftTimeId;
        for (let i = 0; i <= endNo; i++)
          this.minutesOfADay[i] = element.shiftTimeId;
      }
    });
  }

  async addShift(event: IShift) {
    if (!this._validateTimes(event)) {
      this.snackBar.open('the time range has been conflicted with other shift times', '', { duration: 2000 });
    }
    else {
      var res: IServerResponse = await this.shfitPageApiCallerService.modifyShift(
        event
      );
      this.snackBar.open(res.message, '', { duration: 2000 });
      if (res.telId === 200) {
        this.RefreshShiftList();
      }
    }
  }

  async deleteShift(event: IShift) {
    const dialogRef = this.dialog.open(ConfirmDialogPresenter, {
      data: { title: 'Delete ' + event.title, message: 'are you sure?' },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        let shiftToDelete: IShift = { ...event };
        shiftToDelete.shiftTimeId *= -1;
        var res: IServerResponse = await this.shfitPageApiCallerService.modifyShift(
          shiftToDelete
        );
        this.snackBar.open(res.message, '', { duration: 2000 });
        if (res.telId === 200) {
          this.RefreshShiftList();
        }
      }
    });
  }

  async editShift(event: IShift) {
    if (!this._validateTimes(event)) {
      this.snackBar.open('the time range has been conflicted with other shift times', '', { duration: 2000 });
    }
    else {
      var res: IServerResponse = await this.shfitPageApiCallerService.modifyShift(
        event
      );
      this.snackBar.open(res.message, '', { duration: 2000 });
      if (res.telId === 200) {
        this.RefreshShiftList();
      }
    }
  }

  private _validateTimes(shift: IShift): boolean {
    let startNo = this._dateToMinute(shift.startTime);
    let endNo = this._dateToMinute(shift.endTime);

    if (shift.shiftTimeId) {
      if (startNo < endNo) {
        for (let i = startNo; i <= endNo; i++)
          if (this.minutesOfADay[i] && this.minutesOfADay[i] !== shift.shiftTimeId) {
            return false;
          }
      }
      else {
        for (let i = startNo; i <= 1440; i++)
          if (this.minutesOfADay[i] && this.minutesOfADay[i] !== shift.shiftTimeId) {
            return false;
          }
        for (let i = 0; i <= endNo; i++)
          if (this.minutesOfADay[i] && this.minutesOfADay[i] !== shift.shiftTimeId) {
            return false;
          }
      }
    }
    else {
      if (startNo < endNo) {
        for (let i = startNo; i <= endNo; i++)
          if (this.minutesOfADay[i]) {
            return false;
          }
      } else {
        for (let i = startNo; i <= 1440; i++)
          if (this.minutesOfADay[i]) {
            return false;
          }
        for (let i = 0; i <= endNo; i++)
          if (this.minutesOfADay[i]) {
            return false;
          }
      }
    }
    return true;
  }

  changeTimeToMinutes(time) {
    return Date.parse('01/01/2011 ' + time + ':00') / 60000;
  }

  private _dateToMinute(strTime) {
    let time: Date = new Date('2000-01-01 ' + strTime);
    return time.getHours() * 60 + time.getMinutes();
  }
}
