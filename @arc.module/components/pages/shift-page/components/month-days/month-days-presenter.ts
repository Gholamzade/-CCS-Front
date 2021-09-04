import { IShiftTeam } from '@arc.module/models/interfaces/shift-team.interface';

import { IShiftPlan } from '@arc.module/models/interfaces/shift-plane.interface';

import { IShiftDayValue } from '@arc.module/models/interfaces/shift-day-value.interface';
import { IShift } from '@arc.module/models/interfaces/shift.interface';
import { ITeam } from '@arc.module/models/interfaces/team.interface';
import { Component, OnInit } from '@angular/core';

import { ShfitPageApiCallerService } from '../../../../../services/shfit-page-api-caller.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'month-days-presenter',
  template: `<month-days-view


    [shiftTimes]=shiftTimes
    [teams]=teams
    [years]="years"
    [daysValue]=daysValue



    (changedShiftPlan)="changeShiftTeamPlan($event)"
    (changedDate)="onChangeDate($event)"
  ></month-days-view>`
})
export class MonthDaysPresenter implements OnInit {
  teams: ITeam[] = [];
  shiftTimes: IShift[] = [];
  year;
  month;
  daysValue: IShiftDayValue[] = [];
  //selectedMonthIndex;
  years: { key: number, value: string }[];
  monthLen;

  constructor(private snackBar: MatSnackBar,
    private apiCaller: ShfitPageApiCallerService) {
    this.getCurrentDate();
    this.getTeams();
    this.getShifts();
  }

  ngOnInit(): void {
    //this.readMonthPlan();
    //this.years = this.apiCaller.getYears();
  }

  readMonthPlan(plannedShifts: IShiftPlan[]) {
    this.daysValue = [];
    if (this.month < 7) {
      this.monthLen = 31;
    }
    else if (this.month > 6) {
      this.monthLen = 30;
    }
    if (this.month === 12) {
      if (!this.isLeapYear(this.year)) {
        this.monthLen = 29;
      }
    }

    for (let i = 0; i < this.monthLen; i++) {
      const day = i + 1;
      const tempShiftTeamList: IShiftTeam[] = [];
      for (const shift of this.shiftTimes) {
        var plannedTeam: ITeam = null
        var plannedTeamIdForThisShift: number = plannedShifts?.find(x => x.year == this.year && x.month == this.month && x.day == day && x.shiftTimeFk == shift.shiftTimeId)?.shiftTeamFk;
        if (plannedTeamIdForThisShift) {
          plannedTeam = this.teams.find(x => x.shiftTeamId == plannedTeamIdForThisShift)
        }
        tempShiftTeamList.push({ shift: shift, team: plannedTeam });
      }
      this.daysValue.push({
        year: this.year,
        month: this.month,
        day: day,
        shiftTeamList: tempShiftTeamList
      });
    }
  }



  async onChangeDate(changedDateValues: number[]) {
    this.year = changedDateValues[0]; //0 index has selected year
    this.month = changedDateValues[1];//1 index has selected month
    this.daysValue = [];
    let plannedShifts: IShiftPlan[] = [];
    // await this.getShifts();
    // await this.getTeams();
    plannedShifts = await this.apiCaller.getPlannedShifts(this.year, this.month);
    this.readMonthPlan(plannedShifts);
  }

  isLeapYear(year): boolean {
    const tmp = year % 128;
    switch (tmp) {
      case 4:
      case 8:
      case 12:
      case 16:
      case 20:
      case 24:
      case 29:
      case 33:
      case 37:
      case 41:
      case 45:
      case 49:
      case 53:
      case 57:
      case 62:
      case 66:
      case 70:
      case 74:
      case 78:
      case 82:
      case 86:
      case 90:
      case 95:
      case 99:
      case 103:
      case 107:
      case 111:
      case 115:
      case 119:
      case 124:
        return true;
    }

    return false;
  }

  async changeShiftTeamPlan(changedShiftPlan: IShiftPlan) {
    var res = await this.apiCaller.saveShiftTeamPlanChanges(changedShiftPlan);
    this.snackBar.open(res.message, '', { duration: 2000 });
  }

  //////////////////////////  API
  readData() {
  }

  getCurrentDate() {
    const date = this.apiCaller.getCurrentDate();
    this.year = date.year;
    this.month = date.month;
    //this.selectedMonthIndex = this.month - 1;

  }

  async getShifts() {
    this.shiftTimes = await this.apiCaller.getAllShifts();
  }

  async getTeams() {
    this.teams = [];
    this.teams = await this.apiCaller.getAllTeam();
    return this.teams;
  }

}
