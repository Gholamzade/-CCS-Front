import { IUserGroup } from './user-group.interface';
import { IUser } from "./user.interface";
export interface IUserToGroup {
  User: IUser;
  Group: IUserGroup;
}
