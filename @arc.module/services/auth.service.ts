import { TokenService } from './token.service';
import { MenuService } from './menu.service';
import { RoutineService } from './routine.service';
import { HubService } from './hub.service';
import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { SettingsService } from './settings.service';
import { IUser } from '@arc.module/models/interfaces/user.interface';
import { LanguageService } from './language.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class AuthService {



  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private settings: SettingsService,
    private hubService: HubService,
    private routineService: RoutineService,
    private menuService: MenuService,
    private tokenService: TokenService,
    private http: HttpClient,
    private languageService: LanguageService,
  ) {

    if (!environment.production && !this.tokenService.token) {
      let testData = {
        user: { "id": 0, "username": "development", "name": "development", "family": "development", "groupId": 0, "groupName": "development", "unitId": 0 },
        interval: 500000,
        token: 'test'
      }
      this.tokenService.setData(testData)
    }

    if (this.tokenService.token) {
      this.loginStatus.next(true);
      this.startServices();
    }


  }


  async login(usr, pswrd) {
    let obj = {
      username: usr,
      password: pswrd
    }
    const url = this.settings.json.serverAddresses[0] + '/Api/auth';
    return this.http
      .post(url, obj)
      .toPromise()
      .then((data: any) => {
        console.log(data);
        this.tokenService.setData(data);
        this.loginStatus.next(true);
        this.startServices();
        return 'SUCCESS';
      })
      .catch(err => {

        let tmp = err.error.text;
        if (!tmp)
          tmp = 'ERROR CONNECTING TO SERVER';
        return tmp;
      });
  }



  logOut() {
    console.error("clearData");
    this.tokenService.clearData();
    this.stopServices();
  }
  private startServices() {
    this.hubService.start();
    this.routineService.start();
    this.menuService.start();
    this.languageService.start()
  }
  private stopServices() {
    this.hubService.stop();
    this.routineService.stop();
    this.menuService.stop();
  }
}
