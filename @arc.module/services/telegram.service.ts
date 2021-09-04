import { TokenService } from './token.service';
import { HubService } from './hub.service';
import { asapScheduler, Observable, scheduled, throwError } from 'rxjs';
import { Telegram } from './../models/classes/telegram.class';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { AuthService } from './auth.service';
// import { SettingsService } from '../../public-api';
import { SettingsService } from './settings.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root"
})
export class TelegramService {

  get backEndTelegram() {
    return this.hub.latestEvent;
  }

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private tokenService: TokenService,
    private hub: HubService,
    private router: Router,

  ) {

  }

  send(
    telegram: Telegram
  ): Observable<Telegram> {

    const url = this.settings.serverAddress + `/Api/ui?telId=${telegram.telId}`;
    if (telegram.telData == "" || telegram.telData == null) {
      telegram.telData = {};
    }
    let headers = new HttpHeaders();
    let header = new HttpHeaders();
    headers = header.append('content-type', 'application/json');
    headers = header.append('Authorization', 'Bearer ' + this.tokenService.token);

    if (!this.tokenService.token && environment.production) {
      this.router.navigate(["/login"]);
      throw Error('claim ERROR')
    }

    return this.http
      .post<Telegram>(url, telegram.telData, { headers }).pipe(
        catchError((err: any, caught: Observable<any>) => {
          return this.handleError(err)
        }),
        // catchError(this.handleError)

      );
  }



  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if (error.status === 401) {
      if (environment.production) {
        this.router.navigate([`/login`]);
      }
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }
}
