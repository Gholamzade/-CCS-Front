import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuService } from "../services/menu.service";
import { IPureSubMenu } from '@arc.module/models/interfaces/pure-sub-menu.interface';

@Injectable({
  providedIn: 'root'
})
export class PageGuard implements CanActivate {
  private menus: IPureSubMenu[];
  constructor(private router: Router, private menuService: MenuService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let path = state.url;
    if (path.startsWith('/')) {
      path = path.replace('/', '')
    }

    return this.checkAccessRoute(path)
  }

  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }


  async checkAccessRoute(currentRoute: string) {
    this.menuService.subMenus$.subscribe(menus => {
      console.log("subMenus", menus)
      this.menus = menus;
    })

    let hasAccess = this.menus.some(route => route.sRoute === currentRoute)
    if (!hasAccess) {
      this.router.navigate(['404'])
    }
    return this.menus.some(route => route.sRoute === currentRoute)
  }

  checkAccessRoute2(currentRoute: string) {
    console.error(this.menus)
    this.menuService.subMenus$.pipe(
      map(menus => {
        console.log("subMenus", menus)
        console.log("currentRoute", currentRoute)
        this.menus = menus;
        let hasAccess = this.menus.some(route => route.sRoute === currentRoute)
        console.log("🚀 ~ file: page.guard.ts ~ line 91 ~ hasAccess", hasAccess);
        if (!hasAccess) {
          this.router.navigate(['404'])
        }
        return hasAccess;
      })
    )
  }

}
