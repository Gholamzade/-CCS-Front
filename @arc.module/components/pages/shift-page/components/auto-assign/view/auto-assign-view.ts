import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { JALALI_DATE_FORMATS, MaterialJalaliDateAdapter } from '../../../../../../utilities/material.jalali-date.adapter';
import * as jalaliMoment from "jalali-moment";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { IShift } from '@arc.module/models/interfaces/shift.interface';
import { ITeam } from '@arc.module/models/interfaces/team.interface';
import { IShiftAuto } from '@arc.module/models/interfaces/shift-auto.interface';
import { IShiftSlot } from '@arc.module/models/interfaces/shift-slot.interface';
import { IShiftPair } from '@arc.module/models/interfaces/shift-pair.interface';
@Component({
  selector: 'auto-assign-view',
  templateUrl: './auto-assign-view.html',
  styleUrls: ['./auto-assign-view.scss'],
  providers: [
    { provide: DateAdapter, useClass: MaterialJalaliDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_DATE_FORMATS }
  ]
})
export class AutoAssignView implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  @Input() shifts: IShift[];
  @Input() teams: ITeam[];
  @Input() set saveResult(res) {
    if (res) {
      this.openSnackBar('AutoAssgn saved successfully', '');
      this.dialogRef.close();

    }
  }
  //@Output() changedYear = new EventEmitter();
  @Output() shiftAssginList = new EventEmitter<IShiftAuto>();
  days: number[] = [];
  year: number;
  isEmpty = false;
  autoAssign: IShiftAuto = {
    year: 0,
    slots: []
  };

  constructor(private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AutoAssignView>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
  }

  chosenYearHandler(normalizedMonth: jalaliMoment.Moment, datepicker: MatDatepicker<jalaliMoment.Moment>) {
    this.year = normalizedMonth.year();
    datepicker.close();
    this.days = [];
    this.autoAssign.year = this.year;
    this.autoAssign.slots = [];
    //this.changedYear.emit(this.year);
    // for(var i=0;i<3;i++){
    //   this.addDay();
    // }
  }


  addDay() {
    let newDay: IShiftSlot = {
      day: 0,
      shifts: []
    }
    newDay.day = this.days.length + 1;
    this.shifts.forEach(element => {
      let newPair: IShiftPair = {
        ShiftTeamId: 0,
        ShiftTimeId: 0
      }
      newPair.ShiftTimeId = element.shiftTimeId;
      newDay.shifts.push(newPair);
    });
    this.days.push(this.days.length + 1);
    this.autoAssign.slots.push(newDay);

    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }, 20);
  }

  delDay() {
    if (this.days.length > 0) {
      this.days.pop();
      this.autoAssign.slots.pop();
    }
  }

  onChangeTeam(event, itemDay, itemShift: IShift) {
    let shift = this.autoAssign.slots.find(x => x.day == itemDay).shifts.find(x => x.ShiftTimeId == itemShift.shiftTimeId);
    shift.ShiftTeamId = (event.value as ITeam).shiftTeamId;
  }

  assgin() {
    this.isEmpty = false;
    this.autoAssign.slots.forEach(element => {
      element.shifts.forEach(shift => {
        if (!shift.ShiftTeamId) {
          this.isEmpty = true;
        }
      });
    });
    if (this.isEmpty) {
      this.openSnackBar('All Teams must be selected', 'Please select Team');
    }
    else {
      this.shiftAssginList.emit(this.autoAssign);
    }
  }
}
