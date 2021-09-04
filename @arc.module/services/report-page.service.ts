import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ArcTelegramService } from './arcTelegram.service';


import { IReport } from '@arc.module/models/interfaces/report.interface';
import { IReportGroup } from '@arc.module/models/interfaces/report-group.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';
import { Telegram } from '@arc.module/models/classes/telegram.class';

@Injectable({
  providedIn: 'root'
})
export class ReportPageService {

  constructor(private telService: ArcTelegramService) { }

  GetAllReportGroups(unit: IUnit) {
    let reportGroups: IReportGroup[] = [];
    const obj = new Telegram(44, unit);
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        reportGroups.push(element);
      });
      return reportGroups;
    });

  }

  GetReports(reportGroup: IReportGroup) {
    let reports: IReport[] = [];
    const obj = new Telegram(47, reportGroup);
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        reports.push(element);
      });
      return reports;
    });
  }



  ModifyReportGroup(reportGroup: IReportGroup) {

    const obj = new Telegram(45, reportGroup);
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


  ReportGroupReOrdered(reportGroupOrder: number[]) {
    let Ids = {
      reportGroupIds: reportGroupOrder
    }
    const obj = new Telegram(48, Ids);
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


  ReportReOrdered(reportOrder: number[]) {
    let Ids = {
      reportIds: reportOrder
    }
    const obj = new Telegram(49, Ids);
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

  ModifyReport(report: IReport) {
    const obj = new Telegram(46, report);
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

}
