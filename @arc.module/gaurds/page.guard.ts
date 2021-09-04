import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { MenuService } from "../services/menu.service";
import { IPureSubMenu } from '@arc.module/models/interfaces/pure-sub-menu.interface';
import { Telegram } from '@arc.module/models/classes/telegram.class';
import { ArcTelegramService } from '@arc.module/services/arcTelegram.service';

@Injectable({
  providedIn: 'root'
})
export class PageGuard implements CanActivate {
  private menus: IPureSubMenu[];
  constructor(private router: Router, private menuService: MenuService,
    private telService: ArcTelegramService,) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let path = state.url;
    if (path.startsWith('/')) {
      path = path.substring(1)
    }

    return this.getMenus(path)
  }

  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  getMenus(currentRoute) {
    let menusFixed = [];

    this.menus = this.menuService.subMenus.getValue();

    if (this.menus.length === 0) {

      return this.telService.send(new Telegram(31, null)).then(res1 => {
        let menus: IPureSubMenu[] = res1.telData.body;
        menus = this.menuService.sortMenus(menus, 'sPos')

        this.menuService.subMenus.next(menus);

        menusFixed = this.menuService.mappingMenus(menus, menusFixed);
        menusFixed = this.menuService.sortMenus(menusFixed, 'position');

        this.menuService.menus.next(menusFixed);
        return this.hasAccess(menus, currentRoute)

      }).catch(err => {
        console.error(err)
        console.error('hasAccess: ', false);
        return false;
      });
    } else {

      return this.hasAccess(this.menus, currentRoute)

    }
  }


  hasAccess(menus, currentRoute) {
    let hasAccess = menus.some(route => {
      if (route.sRoute === currentRoute) {
        return true;
      }

    })
    console.log('hasAccess:', hasAccess);

    if (!hasAccess) {
      this.router.navigate(['404'])
    }
    return hasAccess;
  }
}
