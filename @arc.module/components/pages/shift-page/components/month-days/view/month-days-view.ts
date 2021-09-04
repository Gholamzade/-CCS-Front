import { IShift } from '@arc.module/models/interfaces/shift.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { JALALI_DATE_FORMATS, MaterialJalaliDateAdapter } from '../../../../../../utilities/material.jalali-date.adapter';
import * as jalaliMoment from "jalali-moment";
import { MatDatepicker } from '@angular/material/datepicker';
import { IShiftDayValue } from '@arc.module/models/interfaces/shift-day-value.interface';
import { ITeam } from '@arc.module/models/interfaces/team.interface';
import { IShiftPlan } from '@arc.module/models/interfaces/shift-plane.interface';

@Component({
  selector: 'month-days-view',
  templateUrl: './month-days-view.html',
  styleUrls: ['./month-days-view.scss'],
  providers: [
    { provide: DateAdapter, useClass: MaterialJalaliDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_DATE_FORMATS }
  ]
})
export class MonthDaysView implements OnInit {

  toDate;
  constructor(public dialog: MatDialog) { }
  @Input() shiftTimes: IShift[]
  @Input() daysValue: IShiftDayValue[]
  @Input() teams: ITeam[] = [];
  @Input() years: { key: number, value: string }[];
  @Output() changedDate = new EventEmitter();
  @Output() changedShiftPlan = new EventEmitter();
  selectedDate: string;

  months: { key: number, value: string }[] = [
    { value: "فروردین", key: 1 },
    { value: "اردیبهشت", key: 2 },
    { value: "خرداد", key: 3 },
    { value: "تیر", key: 4 },
    { value: "مرداد", key: 5 },
    { value: "شهریور", key: 6 },
    { value: "مهر", key: 7 },
    { value: "آبان", key: 8 },
    { value: "آذر", key: 9 },
    { value: "دی", key: 10 },
    { value: "بهمن", key: 11 },
    { value: "اسفند", key: 12 }
  ];

  async ngOnInit() {

  }

  onChangeTeam(teamIndex, shift: IShift, dayValue: IShiftDayValue) {
    const team: ITeam = teamIndex.value;
    dayValue.shiftTeamList.find(x => x.shift.shiftTimeId === shift.shiftTimeId).team = team;
    const changedShiftPlan: IShiftPlan = {
      shiftPlanId: 0,
      shiftTimeFk: shift.shiftTimeId,
      year: dayValue.year,
      month: dayValue.month,
      day: dayValue.day,
      shiftTeamFk: team.shiftTeamId
    };
    this.changedShiftPlan.emit(changedShiftPlan);
  }

  chosenYearHandler(normalizedYear) {

  }

  chosenMonthHandler(normalizedMonth: jalaliMoment.Moment, datepicker: MatDatepicker<jalaliMoment.Moment>) {
    //console.log(normalizedMonth.locale('fa').format('YYYY/M/D'));
    //console.log(normalizedMonth.year());
    this.selectedDate = normalizedMonth.locale('fa').format('YYYY/MM')
    //alert(this.selectedDate)
    // const ctrlValue = this.date.value;
    // ctrlValue.month(normalizedMonth.month());
    // this.date.setValue(ctrlValue);
    datepicker.close();
    var selectedDateValues: number[] = [];
    selectedDateValues.push(normalizedMonth.year());
    selectedDateValues.push(normalizedMonth.month() + 1);
    this.changedDate.emit(selectedDateValues);
  }
}
