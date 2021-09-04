import { Telegram } from '@arc.module/models/classes/telegram.class';
import { IShift } from '@arc.module/models/interfaces/shift.interface';
import { ITeam } from '../models/interfaces/team.interface';
import { Injectable } from '@angular/core';
import { ArcTelegramService } from './arcTelegram.service';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IShiftPlan } from '@arc.module/models/interfaces/shift-plane.interface';
import { IShiftAuto } from '@arc.module/models/interfaces/shift-auto.interface';

@Injectable({
  providedIn: 'root'
})
export class ShfitPageApiCallerService {
  years: { key: number, value: string }[];
  teams: ITeam[] = [];
  shifts: IShift[] = [];
  planedShifts: IShiftPlan[] = [];

  constructor(private telService: ArcTelegramService) {
    //listen to back and call its function
  }


  /////////////////////////////////////////   Team
  getAllTeam() {
    this.teams = [];
    const obj = new Telegram(18, "");
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        this.teams.push(element);
      });

      return this.teams;
    });
  }

  modifyTeam(team: ITeam) {
    const obj = new Telegram(24, team);
    return this.telService.send(obj).then(res => {
      // if (res.telId === 200) {
      // }
      let res2: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return res2;
    });
  }


  /////////////////////////////////////////  Shift

  getAllShifts() {
    this.shifts = [];
    const obj = new Telegram(19, "");
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        this.shifts.push(element);
      });
      return this.shifts;
    });
  }



  modifyShift(event: IShift) {

    const obj = new Telegram(25, event);
    return this.telService.send(obj).then(res => {
      let res2: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return res2;
    });
  }



  /////////////////////////////////// Month Day
  getShiftPlan(year, month) {
    // get data of this year/month
  }

  getCurrentDate() {
    const year = 1399;
    const month = 4;
    return { year: year, month: month };
  }

  saveShiftTeamPlanChanges(changedShiftPlan: IShiftPlan) {
    var selectedShiftPlan = this.planedShifts.find(x => x.day == changedShiftPlan.day);
    const obj = new Telegram(21, changedShiftPlan);
    return this.telService.send(obj).then(res => {
      if (res.telId === 200) {
        if (selectedShiftPlan) {//edit an existing shift plan
          selectedShiftPlan.shiftTeamFk = changedShiftPlan.shiftTeamFk;
        }
        else {//add new shift plan
          this.planedShifts.push(changedShiftPlan);
        }
      }
      let res2: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return res2;
    });

  }

  getPlannedShifts(year: number, month: number) {
    const plannedShift = {
      year: year,
      month: month
    }
    const obj = new Telegram(20, plannedShift);
    this.planedShifts = [];
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        const sp: IShiftPlan = {
          shiftPlanId: element.shiftPlanId,
          year: element.year,
          month: element.month,
          day: element.day,
          shiftTeamFk: element.shiftTeamFk,
          shiftTimeFk: element.shiftTimeFk
        };
        this.planedShifts.push(sp);
      });
      return this.planedShifts;
    });
  }

  autoShiftAssgin(autoModel: IShiftAuto) {

    const obj = new Telegram(50, autoModel);
    return this.telService.send(obj).then(res => {
      // if (res.telId === 200) {
      //   this.shifts.push(event);
      // }
      let serverRes: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return serverRes;
    });
  }
}
