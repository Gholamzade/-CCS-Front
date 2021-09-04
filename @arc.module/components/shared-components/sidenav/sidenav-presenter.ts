import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from '@arc.module/services/menu.service';
import { IMenu } from "@arc.module/models/interfaces/menu.interface";
import { IReportGroup } from '@arc.module/models/interfaces/report-group.interface';
import { Observable } from 'rxjs';
import { TokenService } from '@arc.module/services/token.service';
import { IUser } from '@arc.module/models/interfaces/user.interface';

@Component({
  selector: 'arc-sidenav-presenter',
  template: `<arc-sidenav-view
    [menus]="menus|async"
    [reports]="reports|async"
    [user]="user"
    (toggle)="toggle.emit()"
   ></arc-sidenav-view>`
})
export class ArcSidenavPresenter implements OnInit {
  menus: Observable<IMenu[]> = this.menuService.menus$;
  // private menus: IMenu[]
 
  reports: Observable<IReportGroup[]> = this.menuService.reports$;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>()
  user: IUser

  constructor(
    private menuService: MenuService,
    private tokenService: TokenService,
  ) { }


  async ngOnInit() {
    this.user = this.tokenService.user
  }

}
