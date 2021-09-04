import { TokenService } from './token.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from './auth.service';
// import { SettingsService } from '../../public-api';
import { SettingsService } from './settings.service';
import { Telegram } from '@arc.module/models/classes/telegram.class';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class ArcTelegramService {
  //latestEvent: Subject<TelegramObject> = new Subject<TelegramObject>();

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private tokenService: TokenService,
    private router: Router,

    // private auth: AuthService

  ) {

  }

  async send(
    telegram: Telegram,
    showInConsole = false
  ): Promise<Telegram> {

    const url = await this.settings.json.serverAddresses[0] + `/Api/arc?telId=${telegram.telId}`;


    if (telegram.telData == "" || telegram.telData == null) {
      telegram.telData = {};
    }


    if (showInConsole) {
      console.log(telegram);
    }

    let headers = new HttpHeaders();

    let header = new HttpHeaders();
    headers = header.append('content-type', 'application/json');
    headers = header.append('Authorization', 'Bearer ' + this.tokenService.token);

    //TODO:need test
    if (!this.tokenService.token && environment.production) {
      this.router.navigate(["/login"]);
      throw Error('claim ERROR')
    }

    //TODO: check for server not found and token expire
    const result: Promise<Telegram> = this.http
      .post(url, telegram.telData, { headers })
      .toPromise()
      .then((data: Telegram) => {
        if (data.telId === 0) {
          console.error(data);
        }
        if (showInConsole)
          console.log(data);

        return data;
      })
      .catch(err => {
        this.handleError(err);
        return err;
      }) as Promise<Telegram>;

    return result;
  }


  private handleError(error: Response) {
    // TODO: implement this
    if (error.status === 401) {
      localStorage.clear()
      console.error("telegram error", error);
      if (environment.production) {
        this.router.navigate(["/login"]);
      }
    }

  }



}
