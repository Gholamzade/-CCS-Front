import { IUserGroup } from '@arc.module/models/interfaces/user-group.interface';
import { Injectable } from '@angular/core';
import { ArcTelegramService } from './arcTelegram.service';
import { IModifyUser } from '@arc.module/models/interfaces/modify-user.interface';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { IUserEdit } from '@arc.module/models/interfaces/user-edit.interface';
import { IUser } from '@arc.module/models/interfaces/user.interface';
import { Telegram } from '@arc.module/models/classes/telegram.class';

@Injectable({
  providedIn: 'root'
})
export class UserPageService {


  constructor(private telService: ArcTelegramService) { }

  GetAllGroups() {
    let userGroups = [];
    const obj = new Telegram(14, "");
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        userGroups.push(element);
      });

      return userGroups;
    });
  }


  ModifyUserGroup(group: IUserGroup) {
    const obj = new Telegram(17, group);
    return this.telService.send(obj).then(res => {
      let res2: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return res2;
    });

  }


  async GetAllUsers(group: IUserGroup): Promise<IUser[]> {
    let assignedUsers: IUser[] = []
    let unassignedUsers: IUser[] = []
    const gp = {
      userGroupId: group.userGroupId
    }
    let obj = new Telegram(22, gp);
    return this.telService.send(obj).then(res => {
      res.telData.body.forEach(element => {
        assignedUsers.push(element);
      });

      gp.userGroupId = null;
      obj = new Telegram(22, gp);
      return this.telService.send(obj).then(res => {
        res.telData.body.forEach(element => {
          unassignedUsers.push(element);
        });
        return assignedUsers.concat(unassignedUsers)
      });

    });
  }

  ModifyUser(user: IUserEdit) {

    const obj = new Telegram(23, user);
    return this.telService.send(obj).then(res => {
      // if (res.telId === 200) {
      //   const index = this.userGroups.indexOf(event);
      //   this.userGroups.splice(index, 1);
      // }
      let res2: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return res2;
    });

  }

  ModifyCurrentUser(user: IModifyUser) {
    const obj = new Telegram(51, user);
    return this.telService.send(obj).then(res => {

      let res2: IServerResponse = {
        telId: res.telId,
        message: res.telData.message
      }
      return res2;
    });
  }

}
