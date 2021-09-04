import { IAlert } from './../models/interfaces/alert.interface';
import { IAlertLogItem } from './../models/interfaces/alert-log-item.interface';
import { SettingsService } from './settings.service';
import { Telegram } from './../models/classes/telegram.class';
import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";


const NEW_DEVELOPER_EVENT = "NEW_EVENT";
const NEW_ARC_EVENT = "ARC_EVENT";

@Injectable({
  providedIn: "root"
})
export class HubService {


  private hubConnection: signalR.HubConnection;
  private _interval;
  latestEvent = new Subject<Telegram>();
  lastArcEvent: Subject<any> = new Subject<any>();
  lastAlert: Subject<any> = new Subject<any>();
  private initialized = false;




  constructor(
    public settings: SettingsService,
    private http: HttpClient
  ) { }



  stop() {
    clearInterval(this._interval);

    this.hubConnection?.off(NEW_DEVELOPER_EVENT);
    this.hubConnection?.off(NEW_ARC_EVENT);
    this.hubConnection = null;
    this.initialized = false;

  }

  public start = async () => {
    if (this.initialized)
      return;
    if (!this.hubConnection) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.settings.serverAddress + "/irisaHub")
        .build();

    }
    this.addListener();
    this.addArcListener();
    this._interval = setInterval(() => this.connectionCheck(), 5000);
    this.initialized = true;
    console.log("HUB_SERVICE_STARTED");

  };
  private async connectionCheck() {

    if (!this.hubConnection) {

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.settings.serverAddress + "/irisaHub")
        .build();
    }
    if (
      this.hubConnection.state === signalR.HubConnectionState.Reconnecting ||
      this.hubConnection.state === signalR.HubConnectionState.Disconnected
    ) {
      console.log("RECONNECTING TO HUB");

      this.hubConnection
        .start()
        .then(() => {
          console.log("Connection started");
        })
        .catch(err => {
          console.log("Error while starting connection: " + err);
        });
    }
  }

  private addListener = () => {
    this.hubConnection.on(NEW_DEVELOPER_EVENT, data => {
      const tmp = JSON.parse(data);

      this.latestEvent.next(tmp);
    });
    this.hubConnection.onclose(() => {
      console.log("DISCONNECTED!!!");

      //  this.globals.LastRoute=this.router.url;
      //  this.router.navigate(["/login"]);
      this.lastArcEvent.next({ title: "DISCONNECTED" });
    });
  };

  private addArcListener = () => {
    this.hubConnection.on(NEW_ARC_EVENT, data => {

      if (data.title == "NEW_ALERT") {
        this.lastAlert.next(data.body);
      }
      else
        this.lastArcEvent.next(data);
    });
  };


}
