import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { SettingsService } from '../../../../services/settings.service';
import { AuthService } from '../../../../services/auth.service';
import { Location } from '@angular/common';

import { AlertDefinitionService } from '../../../../services/alert.service';

import { PopupAlertPresenter } from './../components/popup-alert/popup-alert-presenter';
import { MatDialog } from '@angular/material/dialog';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';
import { Router } from '@angular/router';
import { LanguageService } from '@arc.module/services/language.service';

@Component({
  selector: 'arc-toolbar-view',
  templateUrl: './arc-toolbar-view.html',
  styleUrls: ['./arc-toolbar-view.scss']
})
export class ArcToolbarView implements OnInit, OnDestroy {

  dir: string

  audioPlayerTimer;
  playSound: boolean = false;
  audio = new Audio();
  toolbarLogs: IAlertLogItem[] = [];
  popupLogs: IAlertLogItem[] = [];
  title: string;
  selectedLanguage: string;
  customerLogo: string;
  @Input() set newLog(value: IAlertLogItem) {
    if (value) {
      if (!value.popup) {
        this.toolbarLogs.push(value);
      }
      else {
        if (value.sound) {
          this.playSound = true;
        }
        this.popupLogs.push(value);
        const dialogRef = this.dialog.open(PopupAlertPresenter, {
          disableClose: true,
          data: value
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) { //submit without error
            let index = this.popupLogs.indexOf(result as IAlertLogItem);
            if (index != -1) {
              this.popupLogs.splice(index, 1);
              if (this.popupLogs.length == 0 || !this.popupLogs.find(x => x.sound)) {
                this.playSound = false;
              }
            }
          }
        });
      }
    }
  }

  private _defaultLanguage: string;
  @Input() public set defaultLanguage(v: string) {
    this._defaultLanguage = v;
  }


  public get defaultLanguage(): string {
    return this._defaultLanguage
  }


  @Input("languages") languages: string[]
  @Output("toggle") toggleEmitter = new EventEmitter();
  @Output("changeLanguage") changeLanguage = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
    private settings: SettingsService,
    private auth: AuthService,
    private location: Location,
    private alertService: AlertDefinitionService,
    private router: Router,
    public languageService: LanguageService,

  ) {
    this.dir = languageService.getDirection()
    this.selectedLanguage = languageService.selectedLanguage
  }

  ngOnDestroy(): void {
    clearInterval(this.audioPlayerTimer);
  }

  filesArray = [
    'assets/imgs/customer-logo.svg',
    'assets/imgs/customer-logo.png',
    'assets/imgs/customer-logo.jpg',
    'assets/imgs/customer-logo.jpeg',
  ]

  ngOnInit(): void {
    // this.imageExists()
    // this.toolbarLogs.push(
    //   { "title": "asdasdasd", "type": 3, "alertLogId": 171389, "body": "این یک پیام تست  91211255555   ن یک پیام تست  91211255555   ن یک پیام تست  91211255555   ن یک پیام تست  91211255555   ,  91211255555  است", "logDate": "2021-05-23T21:06:08.9001362+04:30", "alertId": null, "popup": false, "sound": false }
    // )

    this.title = this.settings.json?.appTitle;
    this.audio.src = "assets/sounds/alert.mp3";
    this.audio.load();
    this.audioPlayerTimer = setInterval(() => {
      if (this.playSound) this.audio.play();
    }, 2500);

    // for (let i = 1; i <= 5; i++) {
    //   let alertLog: IAlertLogItem = {
    //     alertId: "",
    //     alertLogId: i,
    //     logDate: "",
    //     logText: "toolbar log "+i.toString(),
    //     popup: false,
    //     sound: false,
    //     title: "title" + i.toString(),
    //     type: 3
    //   }
    //   this.toolbarLogs.push(alertLog);
    //   if (alertLog.sound) {
    //     this.playSound = true;
    //   }
    // }

    // this.popupLogs.forEach(alertLog => {
    //   if (alertLog.popup) {
    //     const dialogRef = this.dialog.open(PopupAlertPresenter, {
    //       maxWidth: '700px',
    //       data: alertLog
    //     });
    //     dialogRef.disableClose = true;
    //     dialogRef.afterClosed().subscribe(result => {
    //       if (result) { //submit without error
    //         let index = this.popupLogs.indexOf(result as IAlertLogItem);
    //         if (index != -1) {
    //           this.popupLogs.splice(index, 1);
    //           if (this.popupLogs.length == 0 || !this.popupLogs.find(x => x.sound)) {
    //             this.playSound = false;
    //           }
    //         }
    //       }
    //     });
    //   }
    // });
  }

  toggle() {
    if (this.auth.loginStatus.value) {
      this.toggleEmitter.emit();
    }
  }

  docEvents(ev) {
    switch (ev) {
      case 'back':
        this.location.back();
        break;
      case 'forward':
        this.location.forward();
        break;
      case 'refresh':
        window.location.reload();
        break;
    }
  }

  async toolbarLogConfirmed(alertLog: IAlertLogItem) {
    let res: IServerResponse = await this.alertService.alertLogConfirm(alertLog.alertLogId);
    if (res.telId === 200 || res.telId === -13) {
      let index = this.toolbarLogs.findIndex(toolbarLog => toolbarLog.alertLogId === alertLog.alertLogId);
      if (index != -1) {
        this.toolbarLogs.splice(index, 1);
      }
    }
  }

  logOut() {
    this.router.navigate(["/login"]);
  }


  // imageExists() {

  //   let image = new Image();
  //  .forEach(element => {
  //     this.checkIfImageExists(element)

  //   });

  // }

  // checkIfImageExists(url) {
  //   const img = new Image();

  //   img.src = url;

  //   if (img.complete) {
  //     this.customerLogo = url;
  //   } else {
  //     img.onload = () => {
  //       console.error('customer logo not found')
  //     };
  //     img.onerror = () => {
  //       console.error('customer logo not found')
  //     };
  //   }
  // }
}
