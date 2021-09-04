import { AlertType } from './../../../enums/alert-type';
import { AuthService } from '@arc.module/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { IAlertLogItem } from '@arc.module/models/interfaces/alert-log-item.interface';
import { HubService } from '@arc.module/services/hub.service';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';
import { ISettings } from '@arc.module/models/interfaces/settings.interface';
import { SettingsService } from '@arc.module/services/settings.service';


@Component({
  selector: 'arc-footer-presenter',
  template: `<arc-footer-view
  *ngIf="loggedIn"
    [newLog]="newLog"
    [alertCount]="alertCount"
   ></arc-footer-view>`
})
export class ArcFooterPresenter implements OnInit {
  alertCount: number
  loggedIn = false;
  @Input() newLog: IAlertLogItem;
  constructor(
    private authService: AuthService,
    private hubService: HubService,
    private settingService: SettingsService,
  ) {
    this.alertCount = settingService.json.footerAlertCount
    authService.loginStatus.subscribe(res => {
      this.loggedIn = res;
    })

    this.hubService.lastAlert.subscribe(data => {
      let alertLog = JSON.parse(data)["item1"] as IAlertLogItem;
      let alert = JSON.parse(data)["item2"] as IAlert;
      alertLog.type = alert.alertTypeFk;
      if (alert.alertTypeFk != AlertType.DANGER)
        this.newLog = alertLog;

    })

  }

  async ngOnInit() {

    // [
    //   { "title": "asdasdasd", "type": 3, "alertLogId": 171389, "body": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ", "logDate": "2021-05-23T21:06:08.9001362+04:30", "alertId": null, "popup": false, "sound": false },
    //   { "title": "asdasdasd", "type": 1, "alertLogId": 171389, "body": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ", "logDate": "2021-05-23T21:06:08.9001362+04:30", "alertId": null, "popup": false, "sound": false },
    //   { "title": "asdasdasd", "type": 2, "alertLogId": 171389, "body": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ", "logDate": "2021-05-23T21:06:08.9001362+04:30", "alertId": null, "popup": false, "sound": false },
    //   { "title": "asdasdasd", "type": 4, "alertLogId": 171389, "body": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ", "logDate": "2021-05-23T21:06:08.9001362+04:30", "alertId": null, "popup": false, "sound": false },
    //   { "title": "asdasdasd", "type": 5, "alertLogId": 171389, "body": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ", "logDate": "2021-05-23T21:06:08.9001362+04:30", "alertId": null, "popup": false, "sound": false },
    // ].forEach(res => {
    //   setTimeout(() => {
    //     this.newLog = res
    //   }, 1000)
    // })

  }

}
