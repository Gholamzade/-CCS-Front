import { Injectable } from '@angular/core';


import { ArcTelegramService } from './arcTelegram.service';

import { IMenu } from '@arc.module/models/interfaces/menu.interface';
import { ISubmenu } from '@arc.module/models/interfaces/submenu.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';
import { Telegram } from '@arc.module/models/classes/telegram.class';

@Injectable({
  providedIn: 'root'
})
export class MenuPageService {
  private _menus: IMenu[] = [];



  constructor(private telService: ArcTelegramService) { }

  GetAllUnits() { // this method filter result by parent == 0
    let units: IUnit[] = [];
    const obj = new Telegram(27, "");
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        units.push(element);
      });
      return units.filter(x => x.parent == 0);
    });
  }

  GetAllUnits2() { // this method doesn't filter result
    let units: IUnit[] = [];
    const obj = new Telegram(27, "");
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        units.push(element);
      });
      return units;
    });
  }


  GetAllMenus(unit: IUnit) {
    let menus: IMenu[] = [];
    const obj = new Telegram(33, unit);
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        menus.push(element);
      });
      return menus;
    });

  }

  GetSubMenus(menu: IMenu) {
    let submenus = [];
    const obj = new Telegram(35, menu);
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        submenus.push(element);
      });
      return submenus;
    });
  }


  ModifyMenu(menu: IMenu) {
    const obj = new Telegram(34, menu);
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


  MenuReOrdered(menuOrder: number[]) {
    let Ids = {
      menuIds: menuOrder
    }
    const obj = new Telegram(37, Ids);
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

  SubmenuReOrdered(submenoOrder: number[]) {
    let Ids = {
      submenuIds: submenoOrder
    }
    const obj = new Telegram(38, Ids);
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

  ModifySubmenu(submenu: ISubmenu) {
    const obj = new Telegram(36, submenu);
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
