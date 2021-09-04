import { ArcTelegramService } from './arcTelegram.service';
import { Injectable } from '@angular/core';
import { Telegram } from '@arc.module/models/classes/telegram.class';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { IMenu } from '@arc.module/models/interfaces/menu.interface';
import { IReportGroup } from '@arc.module/models/interfaces/report-group.interface';
import { IPureSubMenu } from '@arc.module/models/interfaces/pure-sub-menu.interface';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menus = new BehaviorSubject<IMenu[]>([]);
  readonly menus$ = this.menus.asObservable();
  private readonly _reports = new BehaviorSubject<IReportGroup[]>([]);
  readonly reports$ = this._reports.asObservable();

  subMenus = new BehaviorSubject<IPureSubMenu[]>([]);
  readonly subMenus$ = this.subMenus.asObservable();

  constructor(
    private telService: ArcTelegramService,
    private router: Router,
  ) { }

  stop() {
    // throw new Error('Method not implemented.');
    // if (this._menus) {
    //   this._menus.unsubscribe()
    // }
    // if (this._reports) {
    //   this._reports.unsubscribe()
    // }

  }

  start() {
    if (this.menus.getValue()?.length === 0) {
      this.getMenus();
      this.getReportMenu()
    }
  }

  getMenus() {
    let menusFixed = [];

    let tel = new Telegram(31, null);
    this.telService.send(tel).then(res1 => {
      let menus: any[] = res1.telData.body;
      menus = this.sortMenus(menus, 'sPos')

      console.log("🚀 ~ menus", menus);

      this.subMenus.next(menus);

      menusFixed = this.mappingMenus(menus, menusFixed);
      menusFixed = this.sortMenus(menusFixed, 'position');

      this.menus.next(menusFixed);

    }).catch(err => {
      console.error(err)
      // this.router.navigate([''])
    });
  }

  public mappingMenus(menus: any[], menusFixed: any[]) {
    menus.forEach(element => {
      if (!(menusFixed.find(a => a.menuId == element.mId)))
        menusFixed.push({
          captionEn: element.mCaption,
          captionFa: element.mCaption,
          menuId: element.mId,
          position: element.mPos,
          titleEn: element.mTitle,
          titleFa: element.mTitle,
          subMenus: []
        });
    });

    menus.forEach(element => {
      let menu = menusFixed.find(a => a.menuId == element.mId);
      menu.subMenus.push({
        captionEn: element.sCaption,
        captionFa: element.sCaption,
        submenuId: element.sId,
        position: element.sPos,
        route: element.sRoute,
        shortcut: element.sShortcut,
        titleEn: element.sTitle,
        titleFa: element.sTitle,
        menuFk: element.mId
      });

    });

    return menusFixed;
  }

  getReportMenu() {
    let tel = new Telegram(32, null);
    let menusFixed: IReportGroup[] = [];
    this.telService.send(tel).then(res => {

      const menus = res.telData.body as {
        reportId: number,
        reportTitle: string,
        reportName: string,
        reportRevision: string,
        reportGroupFk: number,
        groupTitle: string,
        serverAddress: string,
        address?: any,
      }[];

      menus.forEach(element => {
        if (!(menusFixed.find(group => group.reportGroupId == element.reportGroupFk)))
          menusFixed.push({
            position: null,
            reportGroupId: element.reportGroupFk,
            serverAddress: element.address,
            title: element.groupTitle,
            reports: []
          } as IReportGroup);
      });

      menus.forEach(element => {
        let menu = menusFixed.find(group => group.reportGroupId == element.reportGroupFk);
        menu.reports.push({
          reportId: element.reportId,
          title: element.reportTitle,
          name: element.reportName,
          revision: element.reportRevision,
          reportGroupFk: element.reportGroupFk,
          position: null,
          serverAddress: element.serverAddress
        });

      });

      this._reports.next(menusFixed);
    });


  }

  sortMenus(array: any[], sortKey: string) {
    const compare = (a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return 1;
      }
      return 0
    }
    return array.sort(compare)
  }



}
