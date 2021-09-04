import { TelegramService } from './../../@arc.module/services/telegram.service';
import { DynamicRoutesService } from './../../@arc.module/services/dynamic-routes.service';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@arc.module/services/auth.service';
import { routes } from "src/app/app-routing.module";
import { LanguageService } from '@arc.module/services/language.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loginStatus: boolean = false
  direction: string = this.languageService.getDirection()

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private tel: TelegramService,
    public dialog: MatDialog,
    public changeDetectorRef: ChangeDetectorRef,
    public dynamicRoutesService: DynamicRoutesService,
    public languageService: LanguageService,
  ) { }


  ngOnInit(): void {
    let i = 0;


    this.auth.loginStatus.subscribe(status => {
      this.loginStatus = status
      this.changeDetectorRef.detectChanges()
    })

    //NOTE: this line protect routes
    this.dynamicRoutesService.setDynamicRoutes(routes)
  }

}
