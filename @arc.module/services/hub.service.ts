import { IAlert } from './../models/interfaces/alert.interface';
import { IAlertLogItem } from './../models/interfaces/alert-log-item.interface';
import { SettingsService } from './settings.service';
import { Telegram } from './../models/classes/telegram.class';
import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { TokenService } from './token.service';


const NEW_DEVELOPER_EVENT = "NEW_EVENT";
const NEW_ARC_EVENT = "ARC_EVENT";
const ARC_USER_EVENT = "ARC_USER_EVENT";
const ARC_GROUP_EVENT = "ARC_GROUP_EVENT";

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
  connectionId: any;




  constructor(
    public settings: SettingsService,
    public tokenService: TokenService,
    private http: HttpClient
  ) { }



  stop() {
    clearInterval(this._interval);

    this.hubConnection?.off(NEW_DEVELOPER_EVENT);
    this.hubConnection?.off(NEW_ARC_EVENT);
    this.initialized = false;

    this.hubConnection ? this.hubConnection.stop().then(() => {
      console.log('stop hubConnection');

    }).catch(err => console.error(err))
      : null;

    this.hubConnection = null;

  }

  private startConnection(hubConnection) {
    hubConnection
      .start()
      .then(() => {
        console.log("Connection started");
        this.addToGroup(this.tokenService.user.groupName);
      })
      .then(() => this.getConnectionId())

      // )
      .catch(err => {
        console.log("Error while starting connection: " + err);
      });
  }

  public start = async () => {
    if (this.initialized)
      return;
    if (!this.hubConnection) {

      this.hubConnection = await new signalR.HubConnectionBuilder()
        .withUrl(this.settings.serverAddress + "/irisaHub", {
          accessTokenFactory: () => this.getToken()
        })
        .build();
      await this.startConnection(this.hubConnection)
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
        .withUrl(this.settings.serverAddress + "/irisaHub", {
          accessTokenFactory: () => this.getToken()
        })
        .build();
    }
    if (
      this.hubConnection.state === signalR.HubConnectionState.Reconnecting ||
      this.hubConnection.state === signalR.HubConnectionState.Disconnected
    ) {
      console.log("RECONNECTING TO HUB");

      this.startConnection(this.hubConnection);
    }
  }

  public getConnectionId = () => {
    this.hubConnection.invoke('getconnectionid').then(
      (data) => {
        // console.warn("connectionId", data);
        this.connectionId = data;
      }
    );
  }

  public addToGroup = (groupName: string) => {
    this.hubConnection.invoke('AddToGroup', groupName).then(
      () => {
        console.warn(`Add To ${groupName} Group`);
        // this.connectionId = data;
      }
    ).catch(err => console.error(err));;
  }
  public RemoveFromGroup = (groupName: string) => {
    this.hubConnection.invoke('RemoveFromGroup', groupName).then(
      (data) => {
        console.warn("RemoveFromGroup", data);
        // this.connectionId = data;
      }
    ).catch(err => console.error(err));
  }


  private addListener = () => {
    this.hubConnection.on(NEW_DEVELOPER_EVENT, data => {
      const tmp = JSON.parse(data);

      this.latestEvent.next(tmp);
    });

    this.hubConnection.on(ARC_USER_EVENT, data => {
      const tmp = JSON.parse(data);
      // console.log('ARC_USER_EVENT: ', tmp);
      this.latestEvent.next(tmp);

    });


    this.hubConnection.on(ARC_GROUP_EVENT, data => {
      const tmp = JSON.parse(data);
      // console.log('ARC_GROUP_EVENT: ', tmp);
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



  async getToken() {
    return this.tokenService.token
  }
}
