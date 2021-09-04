import { RoutineService } from './routine.service';
import { HubService } from './hub.service';
import { ISettings } from '@arc.module/models/interfaces/settings.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class SettingsService {

  private _json: ISettings;

  get json(): ISettings {
    return this._json;
  }
  get serverAddress(): string {
    return this._json.serverAddresses[0];
  }

  constructor(private http: HttpClient) {
  }
  init(): () => Promise<boolean> {

    return () => this.http
      .get('assets/settings.json')
      .toPromise()
      .then(res => {
        this._json = res as ISettings;
        document.title = this._json.appTitle;
        return true;

      });
  }


}





