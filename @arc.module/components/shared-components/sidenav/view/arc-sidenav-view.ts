import { TokenService } from './../../../../services/token.service';
import { IModifyUser } from '@arc.module/models/interfaces/modify-user.interface';
import { IMenu } from '@arc.module/models/interfaces/menu.interface';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { UserEditorPresenter } from '../../user-editor/user-editor-presenter';
import { MatDialog } from '@angular/material/dialog';
import { IReportGroup } from '@arc.module/models/interfaces/report-group.interface';
import { IReport } from '@arc.module/models/interfaces/report.interface';
import { IUser } from '@arc.module/models/interfaces/user.interface';

import { routes } from 'src/app/app-routing.module';
import { ARC_VERSION } from "@arc.module/arc-version";
import { LanguageService } from '@arc.module/services/language.service';
import { MatSelectionList } from '@angular/material/list';
import { ISubmenu } from '@arc.module/models/interfaces/submenu.interface';
import { DOCROUTESLIST } from '@arc.module/components/doc-pages/doc-pages-routing.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'arc-sidenav-view',
  templateUrl: './arc-sidenav-view.html',
  styleUrls: ['./arc-sidenav-view.scss']
})
export class ArcSidenavView implements OnInit {
  _version = ARC_VERSION;
  @ViewChild('drawer') drawer: MatSidenav;
  @ViewChild('submenus') submenus: MatSelectionList;
  @Input('reports') reportGroups: IReportGroup[];
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>()
  @Input() user: IUser
  firstRoute: string
  private _menus: IMenu[];
  get docRoutes() {
    return DOCROUTESLIST
  }

  production = environment.production

  @Input() set menus(val: IMenu[]) {
    this._menus = val;
    if (val) {
      console.warn('val: ', val);
      this._menus = this.removeRouteWithoutComponent(val)
      console.log('firstRoute: ', this.firstRoute);
      if (this.firstRoute && this.router.url === '/login') {
        this.router.navigate(["/" + this.firstRoute]);
      }
    }
  }

  get menus(): IMenu[] {
    return this._menus;
  }

  dir: string
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public languageService: LanguageService
  ) {

    this.dir = languageService.getDirection()
  }

  ngOnInit(): void {
    // console.warn("this.user", this.user)
  }

  onClick(item: ISubmenu) {
    // this.drawer.close();
    this.toggle.emit();
    // this.router.navigate(["/" + item.route]);
  }

  async navigateToReport(data: IReport) {
    this.toggle.emit();
    await window.open(`#/report-view;reportName=${data.name};reportRevision=${data.revision};serverAddress=${data.serverAddress};`);
  }

  logOut() {
    this.toggle.emit();
    this.router.navigate(["/login"]);
  }

  editUser() {

    let newUserToEdit: IModifyUser = {
      name: this.user.name,
      family: this.user.family,
      username: this.user.username,
      password: "",
      oldPassword: ""
    };

    const dialogRef = this.dialog.open(UserEditorPresenter, {
      maxWidth: '400px',
      data: newUserToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { //submit without error
        this.logOut();
      }
    });

  }

  removeRouteWithoutComponent(menus: IMenu[]): IMenu[] {
    menus.map(menu => {
      console.log('menu: ', menu);
      menu.subMenus = menu.subMenus.filter(sub => {
        let path: string = sub.route;

        if (path?.split('/:').length > 1) {
          return false
        } else {
          return true
        }
        // if (path?.includes('/')) {
        //   path = path.split('/').join('')
        // }
        // if (routes.some(approute => approute.path === path)) {
        //   return sub;
        // }
      })
    })

    menus = menus?.filter(m => m.subMenus.length > 0)
    menus.some(menus => {
      if (menus.subMenus.length > 0) {
        this.firstRoute = menus.subMenus[0]["route"]
        return true;
      }
    })
    return menus;
  }

}
