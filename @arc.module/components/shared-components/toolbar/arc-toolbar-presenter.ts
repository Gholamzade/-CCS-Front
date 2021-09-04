import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { HubService } from '@arc.module/services/hub.service';
import { AlertType } from '@arc.module/enums/alert-type';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';
import { LanguageService } from '@arc.module/services/language.service';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'arc-toolbar-presenter',
  template: `<arc-toolbar-view
  [newLog]="newLog"
  [languages]="languages"
  [defaultLanguage]="defaultLanguage"
  (toggle)="toggled($event)"
  (changeLanguage)="changeLanguage($event)"

   ></arc-toolbar-view>`
})
export class ArcToolbarPresenter implements OnInit {

  @Input() newLog: IAlertLogItem;
  @Output("toggle") toggleEmitter = new EventEmitter();
  languages: string[]
  defaultLanguage: string
  constructor(
    private hubService: HubService,
    private languageService: LanguageService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {

    this.hubService.lastAlert.subscribe(data => {
      let alertLog = JSON.parse(data)["item1"] as IAlertLogItem;
      let alert = JSON.parse(data)["item2"] as IAlert;
      alertLog.popup = alert.isPopup
      alertLog.sound = alert.isSound
      if (alert.alertTypeFk == AlertType.DANGER) {
        this.newLog = alertLog;
        console.log(JSON.stringify(this.newLog));

      }

    })

  }

  async ngOnInit() {
    this.languages = this.languageService.allLanguageSymbols
    this.defaultLanguage = this.languageService.getDefaultLang()
  }

  toggled(e) {
    this.toggleEmitter.emit(e);
  }

  changeLanguage(lang: MatSelectChange) {
    console.error('lang: ', lang);
    this.languageService.selectedLanguage = lang.value;
    // this.changeDetectorRef.detectChanges()
  }

}
